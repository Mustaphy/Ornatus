import { ChangeEvent, useState } from 'react';
import './ElementDesigner.css';
import {
  Selector,
  backgroundProperties,
  borderStyles,
  cursorKeywords,
  selectors,
  Element,
  ConditionalValue,
  textAlignKeywords,
  displayKeywords,
  gridAutoFlowKeywords,
} from './ElementDesignerTypes';
import Input from '../../components/Input/Input'
import UnitSelect from '../../components/UnitSelect/UnitSelect';
import Select from "../../components/Select/Select";
import { MdContentCopy, MdAddCircle } from "react-icons/all";
import { deepCopy, generateId, generateUUID, toCamelCase } from '../../utilities';
import { Type, types } from '../../components/Input/InputTypes';
import TreeView from '../../components/TreeView/TreeView';
import ElementPreview from '../../components/ElementPreview.tsx/ElementPreview';
import { TreeNode } from '../../components/TreeView/TreeViewTypes';
import { defaultElement } from './ElementDesignerData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ElementDesigner() {
  const initialElement: Element = defaultElement;
  const [selectedElementId, setSelectedElementId] = useState(initialElement.uuid);
  const [tree, setTree] = useState<TreeNode[]>([
    {
      element: initialElement,
      onClick: () => setSelectedElementId(initialElement.uuid),
    }
  ]);

  /**
   * Get the conditions when a property should be applied, and what the styling should be
   * @param {Element} element Element to get its property conditions
   * @returns {ConditionalValue[]} conditions when a property should be applied, and what the styling should be
   */
  const getStylingConditions = (element: Element): ConditionalValue[] => {
    return [
      {
        property: 'display',
        value: element.display.keyword,
        condition: element.display.active,
      },
      {
        property: 'grid-auto-flow',
        value: element.gridAutoFlow.keyword,
        condition: element.gridAutoFlow.active && element.display.active && element.display.keyword.includes('grid')
      },
      {
        property: 'height',
        value: element.height.value + element.height.unit,
        condition: element.height.active,
      },
      {
        property: 'width',
        value: element.width.value + element.width.unit,
        condition: element.width.active,
      },
      {
        property: 'background',
        value: getBackgroundStyling(element),
        condition: element.background.active,
      },
      {
        property: 'color',
        value: element.color.hex,
        condition: element.color.active && currentSelectionHasText(element),
      },
      {
        property: 'font-size',
        value: element.fontSize.value + element.fontSize.unit,
        condition: element.fontSize.active && currentSelectionHasText(element),
      },
      {
        property: 'font-weight',
        value: element.fontWeight.value.toString(),
        condition: element.fontWeight.active && currentSelectionHasText(element),
      },
      {
        property: 'text-align',
        value: element.textAlign.keyword,
        condition: element.textAlign.active && currentSelectionHasText(element),
      },
      {
        property: 'border',
        value: `${element.border.width.value + element.border.width.unit} ${element.border.style} ${element.border.color}`,
        condition: element.border.active,
      },
      {
        property: 'border-radius',
        value: element.borderRadius.value + element.borderRadius.unit,
        condition: element.borderRadius.active,
      },
      {
        property: 'margin',
        value: element.margin.value + element.margin.unit,
        condition: element.margin.active,
      },
      {
        property: 'padding',
        value: element.padding.value + element.padding.unit,
        condition: element.padding.active,
      },
      {
        property: 'cursor',
        value: element.cursor.keyword,
        condition: element.padding.active,
      },
    ];
  }

  /**
   * Get the conditions when an attribute should be used for an element, and what the value should be
   * @param {Element} element Element to get its attribute conditions
   * @returns {ConditionalValue[]} conditions when an attribute should be used for an element, and what the value should be
   */
  const getAttributeConditions = (element: Element): ConditionalValue[] => {
    return [
      {
        property: 'id',
        value: element.id,
        condition: true
      },
      {
        property: 'type',
        value: element.type,
        condition: element.selector === 'input' || element.selector === 'button'
      },
      {
        property: 'value',
        value: getCurrentValue(element),
        condition: (element.selector === 'input' && element.type !== 'checkbox') || element.selector === 'textarea'
      },
      {
        property: 'checked',
        value: isChecked(element),
        condition: element.selector === 'input'
      }
    ]
  }

  /**
   * Get the current element
   * @param {TreeNode[]} nodes Nodes to search for the current element
   * @returns {Element | undefined} The current element, or undefined if not found
   */
  const getSelectedNode = (nodes: TreeNode[] = tree): TreeNode | undefined => {
    return nodes.reduce((element: TreeNode | undefined, node) => {
      if (element)
        return element;
  
      if (node.element.uuid === selectedElementId)
        return node;
  
      if (node.children)
        return getSelectedNode(node.children);
  
      return undefined;
    }, undefined);
  };
  const selectedElement = getSelectedNode()!.element;

  /**
   * Update a property of the current element
   * @param {keyof Element} property Property to update
   * @param {any} value Value to update the property to
   */
  const updateProperty = (property: keyof Element, value: unknown): void => {
    setTree(prevHierarchy => {
      const updatePropertyRecursively = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map(node => {
          if (node.element.uuid === selectedElementId) {
            const updatedElement: Element = {
              ...node.element,
              [property]: value
            };

            return {
              ...node,
              element: updatedElement
            };
          }

          if (node.children) {
            return {
              ...node,
              children: updatePropertyRecursively(node.children)
            };
          }

          return node;
        });
      };

      return updatePropertyRecursively(prevHierarchy);
    });
  };

  /**
   * Add an element to the nodes
   * @param {Element} element Element to add to the nodes
   */
  const addElement = (element: Element): void => {
    setTree([...tree, { element: { ...element }, onClick: () => setSelectedElementId(element.uuid) } ]);
    setSelectedElementId(element.uuid);

    toast.success('Element has been created!', {
      position: 'bottom-right',
      autoClose: 2000
    })
  }

  /**
   * Change the linear-gradient background when the selected colors are changed
   * @param {ChangeEvent<HTMLInputElement>} event Event that fires when the selected colors are changed
   * @param {number} index The index of the color that is changed, since the linear-gradient consists of multiple colors
   */
  const handleLinearGradientBackgroundChanged = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
    const colors = selectedElement.background.linearGradient.colors;
    colors[index] = event.target.value;
    updateProperty('background', { ...selectedElement.background, linearGradient: { colors: colors } });
  }

  /**
   * Get the value of the background property based on the current state
   * @param {Element} element Element to get the background styling for
   * @returns {string} Returns the string that is used for the background property in the CSS
   */
  const getBackgroundStyling = (element: Element): string => {
    const background = element.background;

    switch (background.selected) {
      case 'color':
        return background.color.color;
      case 'linear-gradient':
        return `linear-gradient(${background.linearGradient.colors[0]}, ${background.linearGradient.colors[1]})`;
      default:
        return '';
    }
  }

  /**
   * Get the input type that should be used to input the value attribute
   * @param {Element} element Element to get the input type for
   * @returns {Type} Returns which type the input field is used for the value input
   */
  const getTypeForUserInput = (element: Element): Type => {
    switch (element.type) {
      case 'button':
      case 'email':
      case 'password':
      case 'reset':
      case 'search':
      case 'submit':
        return 'text';
      default:
        return element.type;
    }
  }

  /**
   * Get the value that is used currently, based on the selected input type (e.g. text, number)
   * @param {Element} element Element to get the current value for
   * @returns {string} Returns the current value based on the selected input type
   */
  const getCurrentValue = (element: Element): string => {
    const formattedType = toCamelCase(element.type) as keyof typeof element.value;
    return element.value[formattedType].toString();
  }

  /**
   * Get the type options that are available for the selected element
   * @param {Element} element Element to get the type options for
   * @returns {Type[]} Returns which input types are available for the selected element
   */
  const getTypeOptions = (element: Element): Type[] => {
    const typeOptions = types.slice();

    switch (element.selector) {
      case 'button':
        return typeOptions.filter(type => type === 'button' || type === 'reset' || type === 'submit');
      case 'input':
        return typeOptions;
      default:
        return [];
    }
  }

  const isGridAutoFlowVisible = (element: Element): boolean => {
    return element.display.keyword.includes('grid') && element.display.active;
  }

  /**
   * Get if the 'type' option is visible for the user based on the selected element
   * @param {Element} element Element to get the type option visibility for
   * @returns {boolean} Returns if the type option is visible for the user
   */
  const isTypeVisible = (element: Element): boolean => {
    return element.selector == 'input' || element.selector  == 'button';
  }

  /**
   * Get if the 'innerText' option is visible for the user based on the selected element
   * @param {Element} element Element to get the 'innerText' option visibility for
   * @returns {boolean} Returns if the 'innerText' option is visible for the user
   */
  const isInnerTextVisible = (element: Element): boolean => {
    return element.selector  !== 'input' && element.selector  !== 'textarea';
  }

  /**
   * Get if the 'value' option is visible for the user based on the selected element
   * @param {Element} element Element to get the 'value' option visibility for
   * @returns {boolean} Returns if the 'value' option is visible for the user
   */
  const isValueVisible = (element: Element): boolean => {
    return element.selector  === 'input' || element.selector  === 'textarea';
  }

  /**
   * Get if the checkbox is checked or not
   * @param {Element} element The element to check if it is checked 
   * @returns {boolean} Returns true if the checkbox is checked, false otherwise
   */
  const isChecked = (element: Element): boolean => {
    return element.selector === 'input' && element.type === 'checkbox' && element.value.checkbox;
  }

  /**
   * Get if the current state of the element has text on it
   * @param {Element} element Element to check if it has text on it
   * @returns {boolean} Returns if the current state of the element has text on it
   */
  const currentSelectionHasText = (element: Element): boolean => {
    return element.selector  !== 'input' || (element.type !== 'color' && element.type !== 'checkbox');
  }

  /**
   * Get a string of valid HTML of the current state of the element
   * @param {TreeNode[]} nodes Nodes to generate HTML for (defaults to the tree)
   * @param {number} indent Indentation level of the HTML (defaults to 0)
   * @returns {string} Returns a string of valid HTML of the current state of the element
   */
  const generateHTML = (nodes: TreeNode[] = tree, indent = 0): string => {
    return nodes.reduce((acc, node) => {
      const { element, children } = node;
      const attributeProperties = getAttributeConditions(element);
      const selfClosingElements = ['input', 'textarea'];
      const isSelfClosing = selfClosingElements.includes(element.selector);
      const spaces = ' '.repeat(indent);

      const attributes = attributeProperties
        .map(attribute => {
          if (!attribute.condition)
            return '';

          // When there is a boolean attribute, we don't need to set the value explicitly (for example with 'checked')
          return typeof attribute.value === 'string'
            ? `${attribute.property}="${attribute.value}"`
            : attribute.property
        })
        .filter(attribute => attribute !== '');

      let attributesString: string;

      // If there is only one attribute, we can put it on the same line. Otherwise, we put all of them below each other
      attributes.length === 1
        ? attributesString = `${attributes[0]}`
        : attributesString = `\n${spaces}  ${attributes.join(`\n${spaces}  `)}\n${spaces}`

      // Self-closing elements cannot have children or innerText
      if (attributeProperties.length > 0 && isSelfClosing)
        return `${acc}${spaces}<${element.selector} ${attributesString} />\n`;

      let result = `${spaces}<${element.selector} ${attributesString}>\n`;

      if (element.innerText)
        result += `${spaces}  ${element.innerText}\n`;
      if (children)
        result += generateHTML(children, indent + 2);

      result += `${spaces}</${element.selector}>\n`;

      return `${acc}${result}`;
    }, '');
  };

  /**
   * Get a string of valid CSS of the current state of the element
   * @param {TreeNode[]} nodes Nodes to generate CSS for (defaults to the tree)
   * @returns {string} Returns a string of valid CSS of the current state of the element
   */
  const generateCSS = (nodes: TreeNode[] = tree): string => {
    return nodes.reduce((css, node) => {
      const { element, children } = node;
      const propertyConditions = getStylingConditions(element);
  
      css += `#${element.id} {\n`;
    
      propertyConditions.forEach(propertyCondition => {
        const { property, condition, value } = propertyCondition;
  
        if (condition)
          css += `  ${property}: ${value};\n`;
      });
  
      css += `}\n\n`;
  
      if (children)
        css += generateCSS(children);
  
      return css;
    }, '');
  };

  return (
    <div id="element-designer">
      <div id="element-preview">
        <ElementPreview
          tree={tree}
          getStylingConditions={getStylingConditions}
          getCurrentValue={getCurrentValue}
          isChecked={isChecked}
        />
      </div>

      <div id="element-hierarchy">
        <TreeView
          tree={tree}
          onChange={(tree: TreeNode[]) => setTree(tree)}
          toast={toast}
          selectedElementId={selectedElementId}
        />

        <div
          id="add-element-container"
          onClick={() => addElement({ ...deepCopy(defaultElement), uuid: generateUUID(), id: generateId('element') }) }
        >
          <MdAddCircle />
          <p>Add a new element</p>
        </div>
      </div>

      <div id="element-options">
        <h2 className="section-title">Structure (HTML)</h2>
        <hr />

        <div>
          <label htmlFor="element" className="option-name">selector</label>
          <Select
            id="selector"
            value={selectedElement.selector}
            options={selectors.slice()}
            onChange={(event) => {
              const selector = event.target.value as Selector;
              const selfClosingElements = ['input', 'textarea'];
              const currentNode = getSelectedNode();

              if (selfClosingElements.includes(selector) && (currentNode?.children?.length ?? 0)) {
                toast.error(`You can't change this element to a <${selector}>, since it can't have child elements`, {
                  position: 'bottom-right' }
                );
                return;
              }

              updateProperty('selector', selector);
            }}
          />
        </div>

        <div>
          <label htmlFor="id" className="option-name">id</label>
          <Input
            id="id"
            type="text"
            value={selectedElement.id}
            onChange={(event) => updateProperty('id', event.target.value)}
          />
        </div>

        {
          isTypeVisible(selectedElement) &&
            <div>
              <label htmlFor="type" className="option-name">type</label>
              <Select
                id="type"
                value={selectedElement.type}
                options={getTypeOptions(selectedElement)}
                onChange={(event) => updateProperty('type', event.target.value)}
                />
            </div>
        }
      
        {
          isInnerTextVisible(selectedElement) &&
            <div>
              <label htmlFor="innerText" className="option-name">innerText</label>
              <Input
                id="innerText"
                type="text"
                value={selectedElement.innerText}
                onChange={(event) => updateProperty('innerText', event.target.value)}
              />
            </div>
        }

        {
          isValueVisible(selectedElement) &&
            <div className={!selectedElement.value.active ? 'hidden' : ''}>
              <label htmlFor="value" className="option-name">value</label>
              <Input
                id="value"
                type={selectedElement.selector === 'input' ? getTypeForUserInput(selectedElement) : 'text'}
                value={selectedElement.selector === 'input' ? getCurrentValue(selectedElement) : selectedElement.value.text}
                checked={isChecked(selectedElement)}
                onChange={(event) => {
                  const value = selectedElement.type === 'checkbox' ? event.target.checked : event.target.value;

                  updateProperty('value', { ...selectedElement.value, [selectedElement.type]: value });
                }}
              />
            </div>
        }
      </div>

      <div id="styling-options">
        <h2 className="section-title">Styling (CSS)</h2>
        <hr />

        <div className={!selectedElement.display.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.display.active} onChange={() => updateProperty('display', { ...selectedElement.display, active: !selectedElement.display.active } )} />

          <label htmlFor="display" className="option-name">display</label>
          <Select
            id="display"
            value={selectedElement.display.keyword}
            options={displayKeywords.slice()}
            onChange={(event) => updateProperty('display', { ...selectedElement.display, keyword: event.target.value } )}
          />
        </div>

        {
          isGridAutoFlowVisible(selectedElement) &&
            <div className={!selectedElement.gridAutoFlow.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={selectedElement.gridAutoFlow.active} onChange={() => updateProperty('gridAutoFlow', { ...selectedElement.gridAutoFlow, active: !selectedElement.gridAutoFlow.active } )} />

              <label htmlFor="gridAutoFlow" className="option-name">grid-auto-flow</label>
              <Select
                id="gridAutoFlow"
                value={selectedElement.gridAutoFlow.keyword}
                options={gridAutoFlowKeywords.slice()}
                onChange={(event) => updateProperty('gridAutoFlow', { ...selectedElement.gridAutoFlow, keyword: event.target.value } )}
              />
            </div>
        }

        <div className={!selectedElement.height.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.height.active} onChange={() => updateProperty('height', { ...selectedElement.height, active: !selectedElement.height.active } )} />
          <label htmlFor="height" className="option-name">height</label>
          <UnitSelect
            id="height"
            value={selectedElement.height.value}
            unit={selectedElement.height.unit} 
            valueOnChange={(event) => updateProperty('height', { ...selectedElement.height, value: Number(event.target.value) })}
            unitOnChange={(event) => updateProperty('height', { ...selectedElement.height, unit: event.target.value })}
          />
        </div>

        <div className={!selectedElement.width.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.width.active} onChange={() => updateProperty('width', { ...selectedElement.width, active: !selectedElement.width.active } )} />

          <label htmlFor="width" className="option-name">width</label>
          <UnitSelect
            id="width"
            value={selectedElement.width.value}
            unit={selectedElement.width.unit} 
            valueOnChange={(event) => updateProperty('width', { ...selectedElement.height, value: Number(event.target.value) })}
            unitOnChange={(event) => updateProperty('width', { ...selectedElement.height, unit: event.target.value })}
          />
        </div>

        <div className={!selectedElement.background.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.background.active} onChange={() => updateProperty('background', { ...selectedElement.background, active: !selectedElement.background.active } )} />

          <label htmlFor="background-property" className="option-name">background</label>
          <Select
            id="background-property"
            value={selectedElement.background.selected}
            options={backgroundProperties.slice()}
            onChange={(event) => updateProperty('background', { ...selectedElement.background, selected: event.target.value })}
          />
  
          {
            selectedElement.background.selected == 'color' &&
              <Input
                type="color"
                value={selectedElement.background.color.color}
                onChange={(event) => updateProperty('background', { ...selectedElement.background, color: { ...selectedElement.background.color, color: event.target.value } })}
              />
          }
          {
            selectedElement.background.selected == 'linear-gradient' &&
              <>
                <Input
                  type="color"
                  value={selectedElement.background.linearGradient.colors[0]}
                  onChange={(event) => handleLinearGradientBackgroundChanged(event, 0)}
                />
                <Input
                  type="color"
                  value={selectedElement.background.linearGradient.colors[1]}
                  onChange={(event) => handleLinearGradientBackgroundChanged(event, 1)}
                />
              </>
          }
        </div>

        {
          currentSelectionHasText(selectedElement) &&
            <div className={!selectedElement.color.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={selectedElement.color.active} onChange={() => updateProperty('color', { ...selectedElement.color, active: !selectedElement.color.active } )} />

              <label htmlFor="color" className="option-name">color</label>
              <Input
                id="color"
                type="color"
                value={selectedElement.color.hex}
                onChange={(event) => updateProperty('color', { ...selectedElement.border, hex: event.target.value } )}
              />
            </div>
        }

        {
          currentSelectionHasText(selectedElement) &&
          <div className={!selectedElement.fontSize.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={selectedElement.fontSize.active} onChange={() => updateProperty('fontSize', { ...selectedElement.fontSize, active: !selectedElement.fontSize.active } )} />

              <label htmlFor="font-size" className="option-name">font-size</label>
              <UnitSelect
                id="font-size"
                value={selectedElement.fontSize.value}
                unit={selectedElement.fontSize.unit} 
                valueOnChange={(event) => updateProperty('fontSize', { ...selectedElement.fontSize, value: Number(event.target.value) })}
                unitOnChange={(event) => updateProperty('fontSize', { ...selectedElement.fontSize, unit: event.target.value })}
              />
            </div>
        }

        {
          currentSelectionHasText(selectedElement) &&
            <div className={!selectedElement.fontWeight.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={selectedElement.fontWeight.active} onChange={() => updateProperty('fontWeight', { ...selectedElement.fontWeight, active: !selectedElement.fontWeight.active } )} />

              <label htmlFor="font-weight" className="option-name">font-weight</label>
              <Input
                id="font-weight"
                type="number"
                value={selectedElement.fontWeight.value}
                min={100}
                max={900}
                step={100}
                onChange={(event) => updateProperty('fontWeight', { ...selectedElement.cursor, value: Number(event.target.value) } )}
                />
            </div>
        }

        {
          currentSelectionHasText(selectedElement) &&
            <div className={!selectedElement.textAlign.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={selectedElement.textAlign.active} onChange={() => updateProperty('textAlign', { ...selectedElement.textAlign, active: !selectedElement.textAlign.active } )} />

              <label htmlFor="cursor" className="option-name">text-align</label>
              <Select
                id="cursor"
                value={selectedElement.textAlign.keyword}
                options={textAlignKeywords.slice()}
                onChange={(event) => updateProperty('textAlign', { ...selectedElement.textAlign, keyword: event.target.value } )}
              />
            </div>
        }

        <div className={!selectedElement.border.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.border.active} onChange={() => updateProperty('border', { ...selectedElement.border, active: !selectedElement.border.active } )}  />

          <label htmlFor="border" className="option-name">border</label>
          <UnitSelect
            value={selectedElement.border.width.value}
            unit={selectedElement.border.width.unit} 
            valueOnChange={(event) => updateProperty('border', { ...selectedElement.border, width: { ...selectedElement.border.width, value: Number(event.target.value) } })}
            unitOnChange={(event) => updateProperty('border', { ...selectedElement.border, width: { ...selectedElement.border.width, unit: event.target.value } })}
          />
          <Select
            value={selectedElement.border.style}
            options={borderStyles.slice()}
            onChange={(event) => updateProperty('border', { ...selectedElement.border, style: event.target.value } )}
          />
          <Input
            type="color"
            value={selectedElement.border.color}
            onChange={(event) => updateProperty('border', { ...selectedElement.border, color: event.target.value } )}
          />
        </div>

        <div className={!selectedElement.borderRadius.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.borderRadius.active} onChange={() => updateProperty('borderRadius', { ...selectedElement.borderRadius, active: !selectedElement.borderRadius.active } )} />

          <label htmlFor="border-radius" className="option-name">border-radius</label>
          <UnitSelect
            id="border-radius"
            value={selectedElement.borderRadius.value}
            unit={selectedElement.borderRadius.unit} 
            valueOnChange={(event) => updateProperty('borderRadius', { ...selectedElement.borderRadius, value: Number(event.target.value) })}
            unitOnChange={(event) => updateProperty('borderRadius', { ...selectedElement.borderRadius, unit: event.target.value })}
          />
        </div>

        <div className={!selectedElement.margin.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.margin.active} onChange={() => updateProperty('margin', { ...selectedElement.margin, active: !selectedElement.margin.active } )}  />

          <label htmlFor="padding" className="option-name">margin</label>
          <UnitSelect
            id="padding"
            value={selectedElement.margin.value}
            unit={selectedElement.margin.unit} 
            valueOnChange={(event) => updateProperty('margin', { ...selectedElement.margin, value: Number(event.target.value) })}
            unitOnChange={(event) => updateProperty('margin', { ...selectedElement.margin, unit: event.target.value })}
          />
        </div>

        <div className={!selectedElement.padding.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.padding.active} onChange={() => updateProperty('padding', { ...selectedElement.padding, active: !selectedElement.padding.active } )}  />

          <label htmlFor="padding" className="option-name">padding</label>
          <UnitSelect
            id="padding"
            value={selectedElement.padding.value}
            unit={selectedElement.padding.unit} 
            valueOnChange={(event) => updateProperty('padding', { ...selectedElement.padding, value: Number(event.target.value) })}
            unitOnChange={(event) => updateProperty('padding', { ...selectedElement.padding, unit: event.target.value })}
          />
        </div>

        <div className={!selectedElement.cursor.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={selectedElement.cursor.active} onChange={() => updateProperty('cursor', { ...selectedElement.cursor, active: !selectedElement.cursor.active } )} />

          <label htmlFor="cursor" className="option-name">cursor</label>
          <Select
            id="cursor"
            value={selectedElement.cursor.keyword}
            options={cursorKeywords.slice()}
            onChange={(event) => updateProperty('cursor', { ...selectedElement.cursor, keyword: event.target.value } )}
          />
        </div>
      </div>

      <div id="element-code">
        <pre id="button-html" className="code-container">
          {generateHTML()}
          <MdContentCopy className="copy-button" onClick={() => navigator.clipboard.writeText(generateHTML())} />
        </pre>

        <pre id="button-css" className="code-container">
          {generateCSS()}
          <MdContentCopy className="copy-button" onClick={() => navigator.clipboard.writeText(generateCSS())} />
        </pre>
      </div>

      <ToastContainer />
    </div>
  )
}

export default ElementDesigner;

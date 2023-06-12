import { Element, PropertyCondition } from '../../pages/ElementDesigner/ElementDesignerTypes';
import { toCamelCase } from '../../utilities';
import { TreeNode } from '../TreeView/TreeViewTypes';
import { ElementPreviewProps } from './ElementPreviewTypes';

function ElementPreview({ tree: hierarchy, getPropertyConditions }: ElementPreviewProps) {
  /**
   * Get the styles for the element based on the property conditions
   * @param {Element} element The element to get the styles for
   * @returns {Record<string, string>} Returns the styles for the element
   */
  const getStyles = (element: Element): Record<string, string> => {
    const propertyConditions = getPropertyConditions(element);
    const styles: Record<string, string> = {};

    propertyConditions.forEach((condition: PropertyCondition) => {
      if (condition.condition) {
        styles[condition.property] = condition.style;
      }
    });

    return styles;
  };


  /**
   * Get the value that is used currently, based on the selected input type (e.g. text, number)
   * @returns {string} Returns the current value based on the selected input type
   */
  const getCurrentValue = (element: Element): string => {
    const formattedType = toCamelCase(element.type) as keyof typeof element.value;
    return element.value[formattedType].toString();
  }

  /**
   * Get if the checkbox is checked or not
   * @param {Element} element The element to check if it is checked 
   * @returns {boolean} Returns true if the checkbox is checked, false otherwise
   */
  const isChecked = (element: Element): boolean => {
    return element.element === 'input' && element.type === 'checkbox' && element.value.checkbox === 'true';
  }

  /**
   * Render a specfic node in the tree as a JSX element
   * @param {TreeNode} node The node to render
   */
  const renderTreeNode = (node: TreeNode) => {
    const { element, children } = node;
    const elementStyles = getStyles(element);
    const Element = element.element;

    switch (element.element) {
      case 'input':
        return (
          <input
            key={element.id}
            type={element.type}
            value={getCurrentValue(element)}
            style={elementStyles}
            checked={isChecked(element)}
            readOnly
          />
        )
      case 'textarea':
        return (
          <textarea
            key={element.id}
            value={element.value.text}
            style={elementStyles}
            readOnly
          />
        )
      default: 
        return (
          <Element key={element.id} style={elementStyles}>
            {element.innerText}
            {children && children.length > 0 && (
              <div>
                {children.map((childNode) => renderTreeNode(childNode))}
              </div>
            )}
          </Element>
        );
    }
  };

  return <div>{hierarchy.map((node) => renderTreeNode(node))}</div>;
};

export default ElementPreview;

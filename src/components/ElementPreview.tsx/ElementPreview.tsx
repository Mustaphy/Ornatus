import { Element, ConditionalValue } from '../../pages/ElementDesigner/ElementDesignerTypes';
import { toCamelCase } from '../../utilities';
import { TreeNode } from '../TreeView/TreeViewTypes';
import { ElementPreviewProps } from './ElementPreviewTypes';

function ElementPreview({ tree, getStylingConditions, getCurrentValue, isChecked }: ElementPreviewProps) {
  /**
   * Get the styles for the element based on the property conditions
   * @param {Element} element The element to get the styles for
   * @returns {Record<string, string>} Returns the styles for the element
   */
  const getStyles = (element: Element): Record<string, string> => {
    const propertyConditions = getStylingConditions(element);
    const styles: Record<string, string> = {};

    propertyConditions.forEach((condition: ConditionalValue) => {
      if (condition.condition)
        styles[toCamelCase(condition.property)] = condition.value.toString();
    });

    return styles;
  };

  /**
   * Render a specfic node in the tree as a JSX element
   * @param {TreeNode} node The node to render
   */
  const renderTreeNode = (node: TreeNode) => {
    const { element, children } = node;
    const elementStyles = getStyles(element);
    const Element = element.selector;

    switch (element.selector) {
      case 'input':
        return (
          <input
            key={element.uuid}
            type={element.attributes.type}
            value={getCurrentValue(element)}
            style={elementStyles}
            checked={isChecked(element)}
            readOnly
          />
        )
      case 'textarea':
        return (
          <textarea
            key={element.uuid}
            value={element.attributes.value.text}
            style={elementStyles}
            readOnly
          />
        )
      default: 
        return (
          <Element key={element.uuid} style={elementStyles}>
            {element.innerText}
            {
              children && children.length > 0 &&
                <>
                  {children.map((childNode) => renderTreeNode(childNode))}
                </>
            }
          </Element>
        );
    }
  };

  return (
    <>
      {tree.map((node) => renderTreeNode(node))}
    </>
  );
};

export default ElementPreview;

import { CssEngine } from '../../helpers/css-engine';
import { HtmlEngine } from '../../helpers/html-engine';
import { TreeNode } from '../TreeView/TreeViewTypes';
import { ElementPreviewProps } from './ElementPreviewTypes';

function ElementPreview({ tree }: ElementPreviewProps) {
  /**
   * Render a specfic node in the tree as a JSX element
   * @param {TreeNode} node The node to render
   */
  const renderTreeNode = (node: TreeNode) => {
    const { element, children } = node;
    const elementStyles = CssEngine.getJSX(element);
    const Element = element.selector;

    switch (element.selector) {
      case 'input':
        return (
          <input
            key={element.uuid}
            type={element.attributes.type}
            value={HtmlEngine.getCurrentValue(element)}
            style={elementStyles}
            checked={HtmlEngine.isChecked(element)}
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

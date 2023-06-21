import { CssEngine } from '../../helpers/css-engine';
import { HtmlEngine } from '../../helpers/html-engine';
import { TreeNode } from '../TreeView/TreeViewTypes';
import { ElementPreviewProps } from './ElementPreviewTypes';
import './ElementPreview.css';

function ElementPreview({ tree }: ElementPreviewProps) {
  /**
   * Render a specfic node in the tree as a JSX element
   * @param {TreeNode} node The node to render
   */
  const renderTreeNode = (node: TreeNode) => {
    const { element, children } = node;
    const styles = CssEngine.getJSX(element);
    const Element = element.selector;

    switch (element.selector) {
      case 'input':
        return (
          <input
            key={element.uuid}
            type={element.attributes.type}
            value={HtmlEngine.getCurrentValue(element)}
            style={styles}
            className="default-styling"
            checked={HtmlEngine.isChecked(element)}
            readOnly
          />
        )
      case 'textarea':
        return (
          <textarea
            key={element.uuid}
            value={element.attributes.value.text}
            style={styles}
            className="default-styling"
            readOnly
          />
        )
      default: 
        return (
          <Element key={element.uuid} style={styles} className="default-styling" readOnly>
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

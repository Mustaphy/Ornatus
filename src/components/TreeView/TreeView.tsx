import React, { useEffect, useState } from 'react';
import './TreeView.css';
import { TreeNode, TreeViewProps } from './TreeViewTypes';

function TreeView({ data, selectedElementId, toast, onChange }: TreeViewProps) {
  const [tree, setTree] = useState<TreeNode[]>(data);
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);

  // Whenever the data prop changes, update the treeData state
  useEffect(() => {
    setTree(data);
  }, [data]);

  /**
   * Handles the drag start event
   * @param {DragEvent<HTMLLIElement>} event Event that is triggered when the user starts dragging an element
   * @param {string} nodeId The id of the node that is being dragged
   */
  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, nodeId: string) => {
    event.dataTransfer.setData('text/plain', String(nodeId));
  };

    /**
   * Handles the event that occurs when the user drags an element over another element
   * @param {DragEvent<HTMLLIElement>} event Event that is triggered when the user drags an element over another element
   * @param {string} nodeId The id of the node that is being dragged
   */
  const handleDragOver = (event: React.DragEvent<HTMLLIElement>, nodeId: string) => {
    event.preventDefault();
    setDragOverNodeId(nodeId);
  };

  /**
   * Handles the event that occurs when the user drags an element out of another element
   */
  const handleDragLeave = () => {
    setDragOverNodeId(null);
  };

  /**
   * Handles the event that occurs when the user drops an element
   * @param {DragEvent<HTMLLIElement>} event Event that is triggered when the user drops an element
   * @param {string} parentId The id of the node that is being dragged over
   */
  const handleDrop = (event: React.DragEvent<HTMLLIElement>, parentId: string) => {
    const nodeId = event.dataTransfer.getData('text/plain');
    const draggedNode = findNode(tree, nodeId);
    const parentNode = findNode(tree, parentId);

    if (draggedNode && parentNode && isParentValidForChildren(parentNode)) {
      const isDescendant = isNodeDescendant(draggedNode, parentId);

      if (!isDescendant) {
        const updatedTree = removeNode(tree, nodeId);
        const newTree = insertNode(updatedTree, draggedNode, parentId);
        setTree(newTree);
        onChange(newTree);
      }
    } else {
      toast.error(`<${parentNode?.element.element}> can't have child elements`, {
        position: 'bottom-right'
      });
    }

    setDragOverNodeId(null);
  };

  /**
   * Get the node with the given id from the tree, undefined if not found
   * @param {TreeNode[]} tree Tree to search in
   * @param {string} nodeId Id of the node to find
   * @returns {TreeNode | undefined} The node if found, undefined otherwise
   */
  const findNode = (tree: TreeNode[], nodeId: string): TreeNode | undefined => {
    for (const node of tree) {
      if (node.element.uuid === nodeId) {
        return node;
      }
      if (node.children) {
        const foundNode = findNode(node.children, nodeId);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return undefined;
  };

  /**
   * Get whether the given node is a descendant of the node with the given id
   * @param {TreeNode} node Node to check
   * @param {string} targetId Id of the node to check if it is a descendant of the given node
   * @returns 
   */
  const isNodeDescendant = (node: TreeNode, targetId: string): boolean => {
    if (node.element.uuid === targetId) {
      return true;
    }
    if (node.children) {
      for (const childNode of node.children) {
        if (isNodeDescendant(childNode, targetId)) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Removes the node with the given id from the tree, and return the new tree
   * @param {TreeNode[]} tree Tree to search in
   * @param {string} nodeId Id of the node to check
   * @returns {TreeNode[]} The tree with the node with the given id removed
   */
  const removeNode = (tree: TreeNode[], nodeId: string): TreeNode[] => {
    const updatedTree = tree.filter(node => node.element.uuid !== nodeId);

    return updatedTree.map(node => {
      if (node.children) {
        return {
          ...node,
          children: removeNode(node.children, nodeId),
        };
      }
      return node;
    });
  };

  /**
   * Insert a node in the tree, and return the new tree
   * @param {TreeNode[]} tree Tree to add the node to
   * @param {TreeNode} nodeToInsert Node to insert
   * @param {string} parentId Id of the parent node
   * @returns 
   */
  const insertNode = (tree: TreeNode[], nodeToInsert: TreeNode, parentId: string): TreeNode[] => {
    return tree.map(node => {
      if (node.element.uuid === parentId) {
        return {
          ...node,
          children: node.children ? [...node.children, nodeToInsert] : [nodeToInsert],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: insertNode(node.children, nodeToInsert, parentId),
        };
      }
      return node;
    });
  };

  /**
   * Get if the parent node can have children elements
   * @param {TreeNode} parentNode Parent node to check
   * @returns {boolean} Whether the parent node is valid for children
   */
  const isParentValidForChildren = (parentNode: TreeNode): boolean => {
    const selfClosing = ['input', 'textarea'];
    const noChildren = ['button'];

    return !selfClosing.includes(parentNode.element.element) &&
           !noChildren.includes(parentNode.element.element);
  }

  /**
   * Render the tree as a list of JSX elements
   * @param {TreeNode[]} tree Tree to render
   * @param {number} indentLevel Indent level of the current node
   * @returns {Element[] | null} The tree as a list of JSX elements
   */
  const renderTreeNodes = (tree: TreeNode[], indentLevel = 0): JSX.Element[] | null => {
    if (!tree) {
      return null;
    }

    return tree.map(node => (
      <React.Fragment key={node.element.uuid}>
        <li
          draggable="true"
          onDragStart={(event) => handleDragStart(event, node.element.uuid)}
          onDragOver={(event) => handleDragOver(event, node.element.uuid)}
          onDragLeave={handleDragLeave}
          onDrop={(event) => handleDrop(event, node.element.uuid)}
          className={
            `${dragOverNodeId === node.element.uuid ? 'drag-over' : ''} ${selectedElementId === node.element.uuid ? 'selected' : ''}`
          }
          style={{ marginLeft: `${indentLevel * 20}px` }}
          onClick={node.onClick}
        >
          {node.children && (
            <span />
          )}
          <span>{node.element.element}</span>
        </li>
        { node.children && (
          <ul>
            {renderTreeNodes(node.children, indentLevel + 1)}
          </ul>
        )}
      </React.Fragment>
    ));
  };

  return (
    <ul className="tree-view">
      {renderTreeNodes(tree)}
    </ul>
  );
}

export default TreeView;

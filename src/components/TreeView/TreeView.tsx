import React, { useEffect, useState } from 'react';
import './TreeView.css';
import { Element } from '../../pages/ElementDesigner/ElementDesignerTypes';

export interface TreeNode {
  element: Element;
  children?: TreeNode[];
  onClick: () => void;
}

interface TreeViewProps {
  data: TreeNode[];
  selectedElementId: string;
  onChange: (tree: TreeNode[]) => void;
}

const TreeView = ({ data, selectedElementId, onChange }: TreeViewProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(data);
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, nodeId: string) => {
    event.dataTransfer.setData('text/plain', String(nodeId));
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>, nodeId: string) => {
    event.preventDefault();
    setDragOverNodeId(nodeId);
  };

  const handleDragLeave = () => {
    setDragOverNodeId(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>, parentId: string) => {
    const nodeId = event.dataTransfer.getData('text/plain');
    const draggedNode = findNode(treeData, nodeId);

    if (draggedNode && isParentValidForChildren(findNode(treeData, parentId)!)) {
      const isDescendant = isNodeDescendant(draggedNode, parentId);

      if (!isDescendant) {
        const updatedTree = removeNode(treeData, nodeId);
        const newTree = insertNode(updatedTree, draggedNode, parentId);
        setTreeData(newTree);
        onChange(newTree);
      }
    }

    setDragOverNodeId(null);
  };

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

  const insertNode = (tree: TreeNode[], nodeToInsert: TreeNode, parentId: string): TreeNode[] => {
    const updatedTree = tree.map(node => {
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

    return updatedTree;
  };

  const renderTreeNodes = (nodes: TreeNode[] | undefined, indentLevel = 0) => {
    if (!nodes) {
      return null;
    }

    return nodes.map(node => (
      <React.Fragment key={node.element.uuid}>
        <li
          draggable
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

  const isParentValidForChildren = (parentNode: TreeNode): boolean => {
    const selfClosing = ['input', 'textarea'];
    const noChildren = ['button'];

    return !selfClosing.includes(parentNode.element.element) &&
           !noChildren.includes(parentNode.element.element);
  }

  return (
    <ul className="treeview">
      {renderTreeNodes(treeData)}
    </ul>
  );
};

export default TreeView;

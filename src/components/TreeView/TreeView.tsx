import React, { useState } from 'react';
import './TreeView.css';

interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
  hidden?: boolean;
}

interface TreeViewProps {
  data: TreeNode[];
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(data);
  const [dragOverNodeId, setDragOverNodeId] = useState<number | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, nodeId: number) => {
    event.dataTransfer.setData('text/plain', String(nodeId));
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>, nodeId: number) => {
    event.preventDefault();
    setDragOverNodeId(nodeId);
  };

  const handleDragLeave = () => {
    setDragOverNodeId(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>, parentId: number) => {
    const nodeId = Number(event.dataTransfer.getData('text/plain'));
    const draggedNode = findNode(treeData, nodeId);

    if (draggedNode) {
      const isDescendant = isNodeDescendant(draggedNode, parentId);
      if (!isDescendant) {
        const updatedTree = removeNode(treeData, nodeId);
        const newTree = insertNode(updatedTree, draggedNode, parentId);
        setTreeData(newTree);
      }
    }

    setDragOverNodeId(null);
  };

  const handleNodeClick = (nodeId: number) => {
    const updatedTree = toggleNodeVisibility(treeData, nodeId);
    setTreeData(updatedTree);
  };

  const findNode = (tree: TreeNode[], nodeId: number): TreeNode | undefined => {
    for (const node of tree) {
      if (node.id === nodeId) {
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

  const isNodeDescendant = (node: TreeNode, targetId: number): boolean => {
    if (node.id === targetId) {
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

  const removeNode = (tree: TreeNode[], nodeId: number): TreeNode[] => {
    const updatedTree = tree.filter(node => node.id !== nodeId);

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

  const insertNode = (tree: TreeNode[], nodeToInsert: TreeNode, parentId: number): TreeNode[] => {
    const updatedTree = tree.map(node => {
      if (node.id === parentId) {
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

  const toggleNodeVisibility = (tree: TreeNode[], nodeId: number): TreeNode[] => {
    return tree.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          hidden: !node.hidden,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: toggleNodeVisibility(node.children, nodeId),
        };
      }
      return node;
    });
  };

  const renderTreeNodes = (nodes: TreeNode[] | undefined, indentLevel = 0) => {
    if (!nodes) {
      return null;
    }

    return nodes.map(node => (
      <React.Fragment key={node.id}>
        <li
          draggable
          onDragStart={(event) => handleDragStart(event, node.id)}
          onDragOver={(event) => handleDragOver(event, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(event) => handleDrop(event, node.id)}
          className={dragOverNodeId === node.id ? 'drag-over' : ''}
          style={{ marginLeft: `${indentLevel * 20}px` }}
        >
          {node.children && (
            <span
              className={`toggle-icon ${node.hidden ? 'collapsed' : 'expanded'}`}
              onClick={() => handleNodeClick(node.id)}
            />
          )}
          <span>{node.label}</span>
        </li>
        {!node.hidden && node.children && (
          <ul>
            {renderTreeNodes(node.children, indentLevel + 1)}
          </ul>
        )}
      </React.Fragment>
    ));
  };

  return (
    <ul className="treeview">
      {renderTreeNodes(treeData)}
    </ul>
  );
};

export default TreeView;

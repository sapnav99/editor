import React, { useState } from 'react';
import TreeNode from './TreeNode';
import Editor from './Editor';

export default function Tree({ treeData, onAddSubnode }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedNode(null);
  };

  const filterTreeNodes = (node) => {
    if (!searchQuery) return true;

    if (node.label.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }

    if (node.children && node.children.length > 0) {
      return node.children.some(filterTreeNodes);
    }

    return false;
  };

  return (
    <ul>
      {treeData.map((node) => (
        filterTreeNodes(node) && (
          <TreeNode
            node={node}
            key={node.key}
            onAddSubnode={onAddSubnode}
            isMainNode={!node.parentKey}
            onClick={() => handleNodeClick(node)}
          />
        )
      ))}
      {selectedNode && (
        <Editor
          content={selectedNode.label}
          onSave={(content) => {
            setSelectedNode((prevSelectedNode) => ({
              ...prevSelectedNode,
              label: content,
            }));
          }}
        />
      )}
    </ul>
  );
}

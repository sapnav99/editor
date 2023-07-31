import React, { useState } from 'react';
import TreeNode from './TreeNode';
import Editor from './Editor';

export default function Tree({ treeData, onAddSubnode }) {
  const [selectedNode, setSelectedNode] = useState(null);

  
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <ul>
      {treeData.map((node) => (
        <TreeNode
          node={node}
          key={node.key}
          onAddSubnode={onAddSubnode}
          isMainNode={!node.parentKey}
          onClick={() => handleNodeClick(node)}
        />
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

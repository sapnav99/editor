import React, { useState } from 'react';
import Tree from './Tree';
import { BsPlus } from 'react-icons/bs';
import { LuCopyPlus } from 'react-icons/lu';
import { HiOutlineDotsVertical } from 'react-icons/hi'
import './treenode.css'

export default function TreeNode({ node, onAddSubnode }) {
  const { children, label } = node;
  const [showChildren, setShowChildren] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  const handleNameChange = (event) => {
    setNewNodeName(event.target.value);
  };

  const handleAddSubnodeClick = () => {
    if (newNodeName.trim() !== '') {
      onAddSubnode(node, newNodeName);
      setNewNodeName('');
      setShowInput(false);
    }
  };

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hasChildren = children && children.length > 0;
  const isFirstSubnode = node.parentKey === undefined;

  return (
    <div
      className={`tree-node ${isHovered ? 'hovered-node' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick} style={{ marginBottom: '10px' }}>
        <span style={{ marginRight: '2rem' }}>{label}</span>
        {isFirstSubnode && <BsPlus onClick={handleToggleInput} style={{ marginRight: '1rem' }} />}
        <LuCopyPlus style={{ marginRight: '1rem' }} />
        <HiOutlineDotsVertical />
      </div>

      {hasChildren && showChildren && (
        <ul style={{ paddingLeft: '5px', borderLeft: '1px solid black' }}>
          {children.map((childNode, index) => (
            <TreeNode
              node={childNode}
              key={childNode.key}
              onAddSubnode={onAddSubnode}
            />
          ))}
        </ul>
      )}

      {isFirstSubnode && showInput && (
        <div>
          <input
            type="text"
            value={newNodeName}
            onChange={handleNameChange}
            placeholder="New Node Name"
          />
          <BsPlus onClick={handleAddSubnodeClick}>Add Subnode</BsPlus>
        </div>
      )}
    </div>
  );
}

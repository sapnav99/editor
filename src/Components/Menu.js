import React, { useState } from 'react';
import Editor from './Editor';
import Tree from './Tree';
import Tabs from './Tabs';

import './Menu.css';

export default function Menu() {
  const [showTabs, setShowTabs] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


 
  const handleMenuOpen = () => {
    setShowMenu(true);
  };
  

  const handleMenuClose = () => {
    setShowMenu(false);
  };
  
  const [treeData, setTreeData] = useState([
    {
      key: "0",
      label: "collection.1.1",
      children: [
        {
          key: "0-0",
          label: "collection.1.1.1",
          children: [
            {
              key: "0-1-1",
              label: "Content Page 1.1.1.1",
            },
            {
              key: "0-1-2",
              label: "Videos",
            },
          ],
        },
      ],
    },
    {
      key: "1",
      label: "collection.1.2",
      children: [
        {
          key: "1-0",
          label: "Quiz",
        },
        {
          key: "0-0",
          label: "Notes",
        },
      ],
    },
    {
      key: "2",
      label: "collection.2",
      children: [
        {
          key: "0-0",
          label: "collection.2.1",
        }
      ],
    },
    {
      key: "3",
      label: "collection.3",
      children: []
    },
    {
      key: "4",
      label: "collection.4",
      children: []
    },
    {
      key: "5",
      label: "collection.5",
      children: []
    }
  ])

  const findParentNode = (parentNodeKey, data) => {
    for (let node of data) {
      if (node.key === parentNodeKey) {
        return node;
      } else if (node.children && node.children.length > 0) {
        const foundNode = findParentNode(parentNodeKey, node.children);
        if (foundNode) return foundNode;
      }
    }
    return null;
  };

  
  const handleAddSubnode = (parentNode, newNodeName) => {
    const newSubnode = {
      key: Date.now().toString(), 
      label: newNodeName,
      children: [],
    };

    const parentNodeToUpdate = findParentNode(parentNode.key, treeData);

    if (parentNodeToUpdate) {
      if (!parentNodeToUpdate.children) {
        parentNodeToUpdate.children = [];
      }
      parentNodeToUpdate.children.push(newSubnode);
      setTreeData([...treeData]);
    }
  };
  
  const handleAddMainNode = (newNodeName) => {
    const newMainNode = {
      key: Date.now().toString(),
      label: newNodeName,
      children: [],
    };

    setTreeData((prevTreeData) => [...prevTreeData, newMainNode]);
  };
  

  return (
    <div className="row">
      <div className={`col-3 mt-75 ${showMenu ? 'show-menu' : ''}`}>
        <Tabs onAddMainNode={handleAddMainNode} 
        onMenuOpen={handleMenuOpen} 
        />
        <div style={{backgroundColor:'#e6ecff'}}>
        <Tree  treeData={treeData} onAddSubnode={handleAddSubnode}  />
        </div>
      </div>
      <div className="col-9">
        <div className="container">
         <Editor></Editor>.
        </div>
      </div>
    </div>

  );
}

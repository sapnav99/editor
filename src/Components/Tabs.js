import React, { useState } from 'react'
import { BsPlus } from 'react-icons/bs';
import { CiMaximize1 } from 'react-icons/ci';
import { HiChevronDoubleLeft } from 'react-icons/hi';

import { HiOutlineDotsVertical, HiMenu } from 'react-icons/hi';

export default function Tabs({ onAddMainNode, onMenuOpen, onMenuClose }) {
    const [showTabs, setShowTabs] = useState(false);
    const [newMainNodeName, setNewMainNodeName] = useState('');

    const handleMenuToggle = () => {
        
        setShowTabs(!showTabs);
    };

    const handleNewMainNodeChange = (event) => {
        setNewMainNodeName(event.target.value);
    };

    const handleAddMainNodeClick = () => {
        if (newMainNodeName.trim() !== '') {
            onAddMainNode(newMainNodeName);
            setNewMainNodeName('');
        }
    };
    return (
        <div className='mb-35 ms-40'>
            <div className='mt-45 '>
            <div style={{ margin: '0 ' }}>
                <ul className="nav ms-4 me-4">
                    
                    <li className="nav-item p-8 me-2">
                        All
                    </li>
                    <li className="nav-item ms-8 me-2">
                        Board
                    </li>
                    <li className="nav-item me-2">
                        Graph
                    </li>
                    <li className="nav-item me-2">
                        Recent
                    </li>
                    <li className="nav-item me-2">
                        <HiOutlineDotsVertical />
                    </li>

                </ul>
            </div>
            </div>
            <div className='mt-20'>
            <div style={{ marginTop: '1rem', marginBottom:'2rem' }}>
                <ul className="nav ms-4 me-4 mt-10">
                    <li className="nav-item" style={{ marginRight: '6rem' }}>
                        DFIN
                    </li>
                    <li className="nav-item me-2">
                <BsPlus onClick={handleMenuToggle} />
                    </li>
                    <li className="nav-item me-2">
                        <CiMaximize1 />
                    </li>
                    <li className="nav-item me-2">
                        <HiChevronDoubleLeft onClick={onMenuClose} />
                    </li>
                </ul>
                {showTabs && (
                    <div>
                        <input
                            type="text"
                            value={newMainNodeName}
                            onChange={handleNewMainNodeChange}
                            placeholder="New Main Node Name"
                        />
                        <BsPlus onClick={handleAddMainNodeClick}>Add Main Node</BsPlus>
                    </div>
                )}
            </div>
            </div>
        </div>
    )
}

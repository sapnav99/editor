// App.js
import React, { useState } from 'react';
import Editor from './Components/Editor';
import Header from './Components/Header';
import Menu from './Components/Menu';
//import Dropdown from './Components/Dropdown'; 


import './App.css';

function App() {
  const [showDropdown, setShowDropdown] = useState(false); 

  const handleMenuClick = () => {
    setShowDropdown(!showDropdown); 
  };

  return (
    
      <div >
      <div>
          <Header className="d-flex"/>
        </div>
        <div className='col-10'>
          <Menu/>
        </div>
        
      </div>
    
  );
}

export default App;

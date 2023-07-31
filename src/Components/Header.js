import React, { useContext, useState } from 'react';
import { AiOutlineUser, AiOutlineBell, AiOutlineUserAdd, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { Dropdown, Form } from 'react-bootstrap';
import { ThemeContext, themes } from './ThemeContext';
import Tabs from './Tabs';

const Header = ({ onMenuClick }) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    changeTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="header d-flex align-items-center justify-content-between float-right m-3">
      
      <div className="d-flex align-items-center">
        
        <div className="me-4">
          <AiOutlineMenu onClick={onMenuClick} />
        </div>

        
        <Form onSubmit={handleSearchSubmit}>
          <div className="d-flex align-items-center">
            <AiOutlineSearch />
            <Form.Control
              type="text"
              placeholder="dfin..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-0" 
            />
          </div>
        </Form>
      </div>

      
      <div className="d-flex align-items-center">
        <div className="invite-team d-flex align-items-center mx-2">
          <AiOutlineUserAdd size={20} />
          <span className="invite-label me-2">INVITE TEAM MEMBER</span>
        </div>
        <div className="notification mx-2">
          <AiOutlineBell size={24} />
        </div>
        <div className="profile-icon mx-2">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="profile-dropdown">
              <AiOutlineUser size={24} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleDarkMode}>Dark mode</Dropdown.Item>

              <div className="mx-2">
                <Form.Check
                  type="switch"
                  id="dark-mode-switch"
                  label=""
                  checked={theme === themes.dark}
                  onChange={toggleDarkMode}
                />
              </div>

              <Dropdown.Item href="#profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#settings">What's new</Dropdown.Item>
              <Dropdown.Item href="#settings">Help</Dropdown.Item>
              <Dropdown.Item href="#settings">Send feedback</Dropdown.Item>
              <Dropdown.Item href="#settings">Hints and shortcuts</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;

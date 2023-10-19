// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px 0',
};

const navListStyle = {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '0',
};

const navItemStyle = {
  margin: '0',
  padding: '0',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontWeight: 'bold',
  transition: 'color 0.3s',
};

const navLinkHoverStyle = {
  color: '#ff8c00',
};

function Navbar() {
  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/" style={navLinkStyle}>
            Home
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/login" style={navLinkStyle}>
            Login
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/edit" style={navLinkStyle}>
            Edit
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/imageupload" style={navLinkStyle}>
            ImageUpload
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;

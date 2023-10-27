import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css'; 


function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/edit" className="nav-link">
            Edit
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/imageupload" className="nav-link">
            ImageUpload
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

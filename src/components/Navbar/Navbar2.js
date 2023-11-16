import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar2.css'; 

function Navbar2() {
    return (
      <nav className="navbar2">
        <ul className="nav-list2">
            <div className="thing">
          <li className="nav-item2">
            <Link to="/" className="nav-link2">
              OpenSkin
            </Link>
          </li>
          <li className="nav-item2">
            <Link to="/" className="nav-link2">
              About
            </Link>
          </li>
          <li className="nav-item2">
            <Link to="/imageupload" className="nav-link2">
              Contact
            </Link>
          </li>
            </div>
          <li className=" cta">
            <Link to="/edit" className="ctalink">
            Share Your DIY Skincare
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  
export default Navbar2
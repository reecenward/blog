import "../../styles/Header.css";
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar2.css'; 

const Header = () => {
  return (
    <div className="wrapper">
      <div className="spacer"></div>
      <div className="container">
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
          <li className="">
            <Link to="/edit" className= "cta">
            Share Your DIY Skincare
            </Link>
          </li>
        </ul>
      </nav>
        <div className="spacer"></div>
        <div className="elogo">
          <img className="img" src={img1} />
          <h1 className="logo">OpenSkin</h1>
        </div>
        <div className="spacer"></div>
        <p className="pp">
          In a world where skincare often comes with a hefty price tag and a
          long list of complex chemical ingredients, we offer a refreshing
          alternative.
        </p>
        <div className="spacer"></div>
        <h2 className="find">Find a 'DIY' solution.</h2>
        <div className="spacer"></div>
        <div className="box-wrapper">
        <Link to="/categorie/face" className="box">
            <img className="img" src={img1} />
            <div className="text-wrapper">
              <p className="text">Face</p>
            </div>
        </Link>
        <Link to="/categorie/body" className="box">
            <img className="img" src={img2} />
            <div className="text-wrapper">
              <p className="text">Body</p>
            </div>
            </Link>
          <Link to="/categorie/hair" className="box">
            <img className="img" src={img3} />
            <div className="text-wrapper">
              <p className="text">Hair</p>
            </div>
            </Link>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  );
};
export default Header;

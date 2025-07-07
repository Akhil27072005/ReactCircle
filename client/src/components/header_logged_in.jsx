import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import '../styles/Header.css';

const Header = ({ title, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav className="header">
      {/* Left: Logo + Title */}
      <div className="left-section">
        {/* Hamburger: Only visible on small screens */}
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <a href="/home" className="logo-link">
          <img src={logo} alt="app-logo" width="50" height="50" />
        </a>

        
      </div>

      <div className="title">{title}</div>

      {/* Right: Back button */}
      <div className="profile-icon">
        <FaArrowLeft size={30} style={{ cursor: "pointer", paddingRight: "10px" }} onClick={handleBack} />
      </div>
    </nav>
  );
};

export default Header;

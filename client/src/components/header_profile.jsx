import React from "react";
import { Dropdown } from "react-bootstrap";
import { GearFill } from "react-bootstrap-icons";
import logo from "../assets/logo.png";
import '../styles/Header.css';

const Header = ({title}) => {
  return (
    <nav className="header">
      <div className="logo">
        <a href="/home">
          <img src={logo} alt="app-logo" width="50" height="50" />
        </a>
      </div>

      <div className="title">
        {title}
      </div>

      <div className="settings-icon">
        <Dropdown align="end">
          <Dropdown.Toggle variant="transparent" className="border-0 p-0">
            <GearFill size={24} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/edit-profile">Edit Profile</Dropdown.Item>
            <Dropdown.Item href="/login">Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Header;

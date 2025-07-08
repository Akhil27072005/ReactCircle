import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import { FaUser, FaEdit, FaSignOutAlt } from "react-icons/fa";
import defaultProfile from "../assets/default_profile.png";
import "../styles/sidebar_header.css"
import api from "../services/api";

const UserProfileDropdown = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  const profilePicture = user?.profilePic ? `${user.profilePic}` : defaultProfile;
  return (
    <div className="profile-container" ref={dropdownRef}>
      <div className="profile-header" onClick={toggleDropdown}>
        <img src={profilePicture} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <div className="profile-name">{user?.profile_name || "Username"}</div>
          <div className="profile-email">{user?.email || "user@example.com"}</div>
        </div>
        <FaChevronDown className="dropdown-icon" />
      </div>

      {showDropdown && (
  <div className="custom-dropdown">
    <div className="dropdown-header-new">
      <img
        src={profilePicture}
        alt="Profile"
        className="dropdown-profile-img"
      />
      <div className="dropdown-user-info">
        <div className="dropdown-username">{user?.profile_name || "Username"}</div>
        <div className="dropdown-email">{user?.email || "user@example.com"}</div>
      </div>
    </div>
    <div className="dropdown-divider" />
    <div className="dropdown-item-new" onClick={()=>window.location.href="/profile"}>
      <FaUser className="dropdown-icon-left"/>
      View Profile 
    </div>
    <div className="dropdown-item-new" onClick={()=>window.location.href="/edit-profile"}>
      <FaEdit className="dropdown-icon-left"/>
      Edit Profile
    </div>
    <div className="dropdown-item-new" onClick={()=>window.location.href="/login"}>
      <FaSignOutAlt className="dropdown-icon-left"/>
      Logout
    </div>
  </div>
)}


    </div>
  );
};

export default UserProfileDropdown;
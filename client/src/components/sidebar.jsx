import React, { useState, useEffect } from "react";
import ProfileDropdown from "./sidebar_header";
import SidebarMenu from "./sidebar_menu";
import Calendar from "./sidebar_calendar";
import "../styles/sidebar.css";
import api from "../services/api";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/profile/profile");
        setUser(res.data.profile);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Close button (visible on mobile only) */}
      <button className="close-btn" onClick={toggleSidebar}>
        ✕
      </button>

      <div className="sidebar-top">
        {user && <ProfileDropdown user={user} />}
      </div>

      <div className="sidebar-middle">
        <Calendar />
      </div>

      <div className="sidebar-bottom">
        <SidebarMenu />
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import "../styles/sidebar_menu_item.css"

const SidebarMenuItem = ({ label, isActive, onClick }) => {
  return (
    <div
      className={`text-center py-2 sidebar-menu-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {isActive && <hr className="highlight-line" />}
      <div className="menu-label">{label}</div>
      {isActive && <hr className="highlight-line" />}
    </div>
  );
};

export default SidebarMenuItem;

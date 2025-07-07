import React, { useState, useEffect } from "react";
import SidebarMenuItem from "./sidebar_menu_item";

const SidebarMenu = () => {
  const [activeItem, setActiveItem] = useState("Explore");

  useEffect(() => {
  const path = window.location.pathname;
    if (path.includes("/new-post")) {
    setActiveItem("Create Post");
    } else if (path.includes("/search")) {
    setActiveItem("Add Friends");
    } else if (path.includes("/home")) {
    setActiveItem("Explore");
    }
  }, []);

  const handleClick = (item) => {
    setActiveItem(item);
    if (item === "Create Post") {
      window.location.href = "/new-post";
    } else if (item === "Add Friends") {
      window.location.href = "/search";
    } else if (item === "Explore") {
      window.location.href = "/home";
    }
  };

  return (
    <div className="d-flex flex-column mt-2">
      <SidebarMenuItem
        label="Create Post"
        isActive={activeItem === "Create Post"}
        onClick={() => handleClick("Create Post")}
      />
      <SidebarMenuItem
        label="Add Friends"
        isActive={activeItem === "Add Friends"}
        onClick={() => handleClick("Add Friends")}
      />
      <SidebarMenuItem
        label="Explore"
        isActive={activeItem === "Explore"}
        onClick={() => handleClick("Explore")}
      />
    </div>
  );
};

export default SidebarMenu;

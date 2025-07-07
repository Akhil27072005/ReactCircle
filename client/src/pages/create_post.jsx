import { useState } from "react";
import Header from "../components/header_logged_in";
import Sidebar from "../components/sidebar";
import { NewPostForm } from "../components/newPostForm";
import "../styles/create_post.css";
import "../styles/sidebar.css";

const NewPostPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-layout">
      <Header title="Create Post" toggleSidebar={toggleSidebar}/>

      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        
        <div className="post-create-area">
          <NewPostForm/>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
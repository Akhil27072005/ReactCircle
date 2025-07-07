import { useState } from "react";
import Header from "../components/header_logged_in";
import Sidebar from "../components/sidebar";
import { EditPostForm } from "../components/editPostForm";
import "../styles/create_post.css";

const EditPostPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-layout">
      <Header title="Edit Post" toggleSidebar={toggleSidebar}/>

      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        
        <div className="post-create-area">
          <EditPostForm/>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
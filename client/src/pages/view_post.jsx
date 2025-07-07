import { useState } from "react";
import Header from "../components/header_logged_in";
import Sidebar from "../components/sidebar";
import ViewPost from "../components/viewPost";
import "../styles/view_post.css"

const ViewPostPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-layout">
      <Header title="View Post" toggleSidebar={toggleSidebar}/>

      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        
        <div className="post-view-area">
          <ViewPost/>
        </div>
      </div>
    </div>
  );
};

export default ViewPostPage;
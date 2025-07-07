import { useState, useEffect } from "react";
import Header from "../components/header_logged_in";
import Sidebar from "../components/sidebar";
import PostGallery from "../components/postGallery";
import "../styles/home.css";
import "../styles/sidebar.css";
import api from "../services/api";

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ for toggling

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!posts) return;
      try {
        const res = await api.get(`/posts/interacted-posts`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
      }
    };
    fetchUserPosts();
  }, [posts]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-layout">
      <Header title="React -- Connect with Close Ones" toggleSidebar={toggleSidebar} />

      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        
        <div className="post-scroll-area">
          <PostGallery posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

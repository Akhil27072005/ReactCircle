import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/header_profile";
import PostGallery from "../components/postGallery";
import ProfileCard from "../components/profileCard";
import { useParams } from "react-router-dom";

const ProfilePage = () => {

  const {id} = useParams(); 
  console.log("User ID from URL", id);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(()=>{
    const fetchProfile = async() => {
      try{
        let res;

      if (!id || id === "profile") {
        // Logged-in user
        res = await api.get("/profile/profile");
      } else {
        // Viewing another user's profile
        res = await api.get(`/profile/${id}`);
      }
        setUser(res.data.profile);
      }
      catch(err){
        setError("Unable to load profile. Please try again later")
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;
      try {
        const res = await api.get(`/posts/user/${user._id}`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
      }
    };
    fetchUserPosts();
  }, [user]);


  return(
    <div className="container-fluid" style={{paddingLeft:"0px", paddingRight:"0px"}}>
        <Header title={"Profile"}/>

        <div className="container py-4">
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {user ? (
              <ProfileCard user={user} />
            ) : (
              <p className="text-center">Loading profile...</p>
            )}
            <hr className="my-4" style={{color:"skyblue"}}/>
            <PostGallery posts={posts}/>
        </div>
    </div>

  );
};

export default ProfilePage;
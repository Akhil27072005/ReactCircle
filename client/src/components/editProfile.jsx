import React, { useRef, useState, useEffect } from "react";
import "../styles/editProfile.css";
import profilePic from "../assets/default_profile.png"; 
import api from "../services/api";

const EditProfile = () => {


  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(profilePic);
  const [formData, setFormData] = useState({
    profile_name: "",
    username: "",
    email: "",
    about: "",
    password: "",
    quote: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);

      // ✅ Store the image file in formData for submission
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/profile");
        const data = res.data.profile;
        setFormData({
          profile_name: data.profile_name || "",
          username: data.username || "",
          email: data.email || "",
          about: data.about || "",
          password: "", // empty for security
          quote: data.quote || "",
          profilePic: data.profilePic || "",
        });

        if (data.profilePic) {
          setPreviewImage(`${data.profilePic}`);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("profile_name", formData.profile_name);
      payload.append("username", formData.username);
      payload.append("email", formData.email);
      payload.append("about", formData.about);
      payload.append("password", formData.password);
      payload.append("quote", formData.quote);
      if (formData.imageFile) {
        payload.append("profilePic", formData.imageFile);
      }

      const res = await api.put("/profile/update", payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      window.location.href="/profile";
    } catch (err) {
      console.error("Update error", err);
      alert("Error updating profile");
    }
  };

    
  return (
    <div className="edit-profile-page">
      <div className="profile-picture-section">
        <img 
            onClick={handleImageClick}
            src={previewImage}
            alt="Preview"
            className="profile-picture"
          />
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="profileName">Profile Name</label>
              <input type="text" id="profile_name" value={formData.profile_name} onChange={handleChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="about">About</label>
              <textarea id="about" rows="8" value={formData.about} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={formData.username} onChange={handleChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="profileQuote">Profile Quote</label>
              <textarea id="quote" rows="4" value={formData.quote} onChange={handleChange}></textarea>
              <div className="form-footer">
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </div>
          </div>
        </div>

        
      </form>
    </div>
  );
};

export default EditProfile;

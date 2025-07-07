import React, { useRef, useState } from "react";
import "../styles/newPostForm.css";
import imagePlaceholder from "../assets/imagePlaceholder.png";
import api from "../services/api";

export function NewPostForm() {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(imagePlaceholder);
  const [formData, setFormData] = useState({
    title:"",
    caption:"",
    description:"",
    imageFile:null 
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setFormData({...formData, imageFile: file});
    }
  };

  const handleSumbit = async(e) => {
    e.preventDefault();

    try{
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("caption", formData.caption);
      payload.append("description", formData.description);
      if (formData.imageFile) {
        payload.append("image", formData.imageFile);
      }

       const res = await api.post("/posts", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        window.location.href = "/home";
    }
    catch(err){
      alert("Failed to create post");
      console.error("Post creation failed:", err);
    }
  }

  return (
    <form className="create-post-form" onSubmit={handleSumbit}>
      <div className="form-container">
        {/* Left Column */}
        <div className="image-section" onClick={handleImageClick}>
          <img
            src={previewImage}
            alt="Preview"
            className="image-preview"
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

        {/* Right Column */}
        <div className="input-section">
          <div className="input-group">
            <label>Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleInputChange} style={{fontFamily:"Rubik"}}/>
          </div>
          <div className="input-group">
            <label>Caption</label>
            <input type="text" name="caption" value={formData.caption} onChange={handleInputChange} style={{fontFamily:"Rubik"}}/>
          </div>
          <div className="input-group description-box">
            <label>Description</label>
            <textarea name="description" rows="9" value={formData.description} onChange={handleInputChange} style={{fontFamily:"Rubik"}}/>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-container">
        <button type="submit" style={{fontFamily:"Montserrat"}}>Tell Friends</button>
        {/* Note and Footer */}
        <hr />
        <p className="note">
            <strong>Note:</strong> Everyone in your interaction list will be able to view this post and interact with it.
        </p>
      </div>

      
      
    </form>
  );
}

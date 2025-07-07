import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/editPostForm.css";
import imagePlaceholder from "../assets/imagePlaceholder.png";
import api from "../services/api";

export function EditPostForm() {
  const { id } = useParams(); 
  const fileInputRef = useRef(null);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(imagePlaceholder);
  const [imageFile, setImageFile] = useState(null);


  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        const post = res.data.post;
        setTitle(post.title);
        setCaption(post.caption || "");
        setDescription(post.description || "");
        if (post.imageURL) {
          setPreviewImage(`http://localhost:5000/${post.imageURL}`);
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

    await api.put(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
      window.location.href=`/view-post/${id}`;
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await api.delete(`/posts/${id}`);
      window.location.href="/home";
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Error deleting post.");
    }
  };

  return (
    <form className="create-post-form">
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
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Right Column */}
        <div className="input-section">
          <div className="input-group">
            <label>Title</label>
            <input type="text" value={title} name="title" required onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className="input-group">
            <label>Caption</label>
            <input type="text"  value={caption} name="caption" onChange={(e)=>setCaption(e.target.value)}/>
          </div>
          <div className="input-group description-box">
            <label>Description</label>
            <textarea name="description" value={description} rows="9" onChange={(e)=>setDescription(e.target.value)}/>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-container-edit">
        <button type="submit" className="btn btn-success" onClick={handleApply} style={{fontFamily:"Poppins"}}>Apply Changes</button>
        <button
          type="button" className="btn btn-danger" onClick={handleDelete} style={{fontFamily:"Poppins"}}>Delete Post</button>
      </div>

      
      
    </form>
  );
}

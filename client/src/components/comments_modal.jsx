import React from "react";
import DefaultProfile from "../assets/default_profile.png";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import api from "../services/api";
import "../styles/comments_modal.css";

const CommentsModal = ({id}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editCommentId, setEditCommentId] = useState("");

  useEffect(()=>{
    const fetchPostComments = async() => {
      try{
        const res = await api.get(`posts/${id}`);
        setComments(res.data.post.comments);
      }
      catch(err){
        console.error("Failed to fetch post:", err);
      }
    };
     if (id) fetchPostComments();
  },[id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".position-relative")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSumbit = async(e) => {
    if (!newComment.trim()) return;


    try {

      if(editCommentId){
        await api.put(`/posts/${id}/comments/${editCommentId}`, {comment: newComment});
      }
      else{
        await api.post(`/posts/${id}/comment`, { text: newComment });
      }
      setNewComment("");
      setEditCommentId(null);
      // Re-fetch comments
      const res = await api.get(`/posts/${id}`);
      setComments(res.data.post?.comments || []);
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Error posting comment");
    }
  };

  const handleEdit = (comment) => {
    // Set state to editable comment (you can show a small input or open a modal)
    setNewComment(comment.text);
    setEditCommentId(comment._id);
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/posts/${id}/comments/${commentId}`);
      // Refetch updated comments
      const res = await api.get(`/posts/${id}`);
      setComments(res.data.post.comments || []);
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };



  return (
    <div
      className="modal fade"
      id="comments_modal"
      data-bs-backdrop="true"
      data-bs-keyboard="true"
      tabIndex="-1"
      aria-labelledby="commentsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="commentsModalLabel">Comments</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul className="list-unstyled">
                {comments.map((comment, index) => (
                  <li key={index} className="mb-3 d-flex align-items-start justify-content-between">
                    <div className="d-flex">
                      <img
                        src={comment.user?.profilePic ? `http://localhost:5000/${comment.user.profilePic}` : DefaultProfile}
                        alt="profile"
                        className="me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <strong>{comment.user?.profile_name}</strong><br />
                        <span>{comment.text}</span>
                      </div>
                    </div>

                    {/* React icon with dropdown if the user is the owner */}
                    {comment.user?._id === currentUserId && (
                      <div className="position-relative">
                        <button
                          className="btn btn-sm"
                          onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {activeDropdown === index && (
                          <div className="custom-dropdown-box">
                            <button className="dropdown-item" onClick={() => handleEdit(comment)}>Edit</button>
                            <button className="dropdown-item text-danger" onClick={() => handleDelete(comment._id)}>Delete</button>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
                </ul>
              )}
            </div>


          <div className="modal-footer">
            <form className="w-100 d-flex gap-2" onSubmit={handleSumbit}>
              <input 
                type="text"
                className="form-control"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e)=>setNewComment(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>

    
  );
};

export default CommentsModal;

import React, { useState, useEffect, useRef } from "react";
import DefaultProfile from "../assets/default_profile.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import api from "../services/api";

const LikesModal = ({ id }) => {
  const [likes, setLikes] = useState([]);
  const modalRef = useRef(null);

  const fetchLikes = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setLikes(res.data.post.likes);
    } catch (err) {
      console.error("Failed to fetch likes", err);
    }
  };

  useEffect(() => {
    const modal = document.getElementById("likes_modal");

    const handleShow = () => {
      fetchLikes();
    };

    if (modal) {
      modal.addEventListener("shown.bs.modal", handleShow);
    }

    return () => {
      if (modal) {
        modal.removeEventListener("shown.bs.modal", handleShow);
      }
    };
  }, [id]);

  return (
    <div
      className="modal fade"  
      id="likes_modal"
      data-bs-backdrop="true"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="likesModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="likesModalLabel">Likes</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {likes.length === 0 ? (
              <p>No likes yet.</p>
            ) : (
              <ul className="list-unstyled">
                {likes.map((like, index) => (
                  <li key={index} className="mb-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={like?.profilePic ? `http://localhost:5000/${like.profilePic}` : DefaultProfile}
                        alt="profile"
                        className="me-2"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                      <p style={{marginTop:"0.8rem"}}>{like?.profile_name || "Unknown"}</p>
                    </div>
                    <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LikesModal;

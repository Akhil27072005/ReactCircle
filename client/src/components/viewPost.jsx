import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FaEdit } from "react-icons/fa";
import ImagePlaceholder from "../assets/imagePlaceholder.png";
import defaultProfile from "../assets/default_profile.png";
import CommentsModal from "./comments_modal";
import LikesModal from "./likes_modal";
import "../styles/viewPost.css";
import api from "../services/api";

const ViewPost = () => {

    const { id } = useParams(); // get post id from URL
    const [post, setPost] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [error, setError] = useState("");
    const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPost = async () => {
            try {
            const res = await api.get(`/posts/${id}`);
            setPost(res.data.post);
            setLikeCount(res.data.totalLikes);
            setCommentCount(res.data.totalComments);

            // Optional: Check if current user has liked (assuming user ID stored in localStorage or context)
            const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
            setLiked(res.data.post.likes.includes(currentUserId));
            } catch (err) {
            console.error("Failed to fetch post:", err);
            }
        };
        fetchPost();
        }, [id]
    );

    const handleLikeToggle = async () => {
        try {
            const res = await api.post(`/posts/${id}/like`);
            setLiked(res.data.liked);
            setLikeCount(res.data.totalLikes);
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };


    return(
        <div className="single-post-page">
            <div className="post-content-wrapper">
                <div className="post-left">
                <img src={post?.imageURL ? `${post.imageURL}` : ImagePlaceholder} alt="Post" className="post-image"  onError={(e) => { e.target.onerror = null; e.target.src = ImagePlaceholder;}}/>
                <div className="reaction-bar">
                    <span className="icon">
                        <FontAwesomeIcon icon={faHeart} style={{color:"red", cursor:"pointer"}} onClick={handleLikeToggle}/>
                        <span className="like-count" data-bs-toggle="modal" data-bs-target="#likes_modal" style={{paddingLeft:"10px", fontSize:"25px", fontFamily:"Poppins"}}>{likeCount}</span>
                    </span>
                    <span className="icon" data-bs-toggle="modal" data-bs-target="#comments_modal">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </span>
                </div>

                <CommentsModal id={id}/>
                <LikesModal id={id}/>
            </div>

                <div className="post-right">
                <div className="post-author">
                    <img src= {post?.author?.profilePic ? `${post.author.profilePic}` : defaultProfile} alt="default"/>
                    <span className="username" style={{cursor:"pointer"}} onClick={() => navigate(`/profile/${post?.author?._id}`)}>{post?.author?.profile_name || "Unknown User"}</span>
                    
                </div>

                <div className="post-title">
                    <strong>{post.title}</strong>
                    {post?.author?._id === currentUserId && (
                        <a href={`/edit-post/${post._id}`} className="ms-2 text-decoration-none" title="Edit Post">
                        <FaEdit style={{ cursor: "pointer", color:"black" }} />
                        </a>
                    )}
                </div>

                <div className="post-caption">
                    {post.caption}
                </div>
                </div>
            </div>

            <div className="post-description">
                {post.description}
            </div>
        </div>
    );
}

export default ViewPost;
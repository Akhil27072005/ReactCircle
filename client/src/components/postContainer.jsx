import React from 'react';
import "../styles/post.css";

const PostContainer = ({ imageURL, title, postId }) => {
  return (
    <div className="card shadow-sm" onClick={()=>window.location.href=`/view-post/${postId}`} style={{cursor:"pointer"}}>
      <img 
        src={imageURL} 
        alt={title} 
        className="card-img-top img-fluid" 
        style={{ height: '250px', objectFit: 'cover' }} 
      />
      <div className="card-body">
        <h5 className="card-title text-center" style={{fontFamily:"Nunito"}}>{title}</h5>
      </div>
    </div>
  );
};

export default PostContainer;

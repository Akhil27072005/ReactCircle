import React from "react";
import PostContainer from "../components/postContainer";
import "../styles/post.css";


const PostGallery = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center mt-4">No posts to display</p>;
  }

  return (
    <div className="post-gallery">
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <PostContainer imageURL={`${post.imageURL}`} title={post.title} postId={post._id}/>
        </div>
      ))}
    </div>
  );
};

export default PostGallery;

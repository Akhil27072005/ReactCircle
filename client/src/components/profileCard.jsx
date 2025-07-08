import React, {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import '../styles/profileCard.css';
import api from "../services/api";
import defaultprofile from "../assets/default_profile.png";

export const toggleInteraction = (targetUserId) => {
  return api.post(`/profile/${targetUserId}/interact`);
};

const ProfileCard = ({ user }) => {

  const [interacted, setInteracted] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isOwnProfile = loggedInUser?.id === user._id;
  const {id} = useParams();

  const handleInteract = async () => {
    try {
      const res = await toggleInteraction(user._id);
      setInteracted(!interacted);
    } catch (err) {
      console.error("Interaction failed", err);
    }
  };

  useEffect(() => {
    const checkInteraction = async () => {
      try {
        const res = await api.get(`/profile/${id}/interacted`);
        setInteracted(res.data.interacted);
      } catch (err) {
        console.error("Failed to check interaction status:", err);
      }
    };

    if (!isOwnProfile && id) {
      checkInteraction();
    }
  }, [id, isOwnProfile]);


  const profileImageUrl = user.profilePic ? `${user.profilePic}` : defaultprofile;

  return (
    <div className="profile-card">

      <div className="profile-left">
        <img src={profileImageUrl} alt="Profile" />
      </div>

      <div className="profile-middle">
        <input className="input-box" value={user.profile_name} readOnly />
        <input className="input-box" value={user.username} readOnly />
        <textarea className="input-box-about" value={user.about || "About not set"} readOnly rows={3} />
      </div>

      <div className="profile-right">
        <div className="btn-class">
          {!isOwnProfile && (
          <button onClick={handleInteract} className={`btn w-100 ${interacted ? 'btn-outline-dark' : 'btn-primary'}`} style={{ fontWeight: 'bold', fontFamily: 'montserrat' }}>
            {interacted ? "Uninteract" : "Interact"}
          </button>
        )}
        </div>
        <div className="quote-card">
          <div className="quote">"{user.quote || "No quote"}"</div>

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

import React from "react";
import defaultProfile from "../assets/default_profile.png";

const profileImage = ({src, alt="profile", size, className="", style ,rounded=true}) => {

    const finalSrc = src || defaultProfile;

    const defaultStyle = {
        width : size? `${size}` : '100%',
        height : size? `${size}` : "auto",
        ObjectFit : "cover",
        border : "2px solid #ccc",
        backgroundColor : "#f0f0f0",
        borderRadius : rounded? '50%' : "0%",
        ...style,
    };

    return(
        <img src={finalSrc} alt={alt} className={className} style={defaultStyle}></img>
    );
};

export default profileImage;
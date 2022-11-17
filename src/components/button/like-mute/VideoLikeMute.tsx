import React from "react";
import "./VideoLikeMute.css";

const VideoLikeMute = () => {
  return (
    <div className="like-mute-container">
      <div className="like-mute-wrapper">
        <img src="/icon/favorite.png" alt="Favorite" />
        <div className="like-mute-divider"></div>
        <img src="/icon/unmute.png" alt="Mute" />
      </div>
    </div>
  );
};

export default VideoLikeMute;

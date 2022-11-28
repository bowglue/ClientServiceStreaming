import FavoriteBorder from "../../../assets/favorite-icon/favorite.png";
import Unmute from "../../../assets/mute-icon/unmute.png";
import "./VideoLikeMute.css";

const VideoLikeMute = () => {
  return (
    <div className="like-mute-container">
      <div className="like-mute-wrapper">
        <img src={FavoriteBorder} alt="Mute" />
        <div className="like-mute-divider"></div>
        <img src={Unmute} alt="Mute" />
      </div>
    </div>
  );
};

export default VideoLikeMute;

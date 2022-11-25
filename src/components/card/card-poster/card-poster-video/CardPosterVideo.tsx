import PropTypes from "prop-types";
import VideoInfo from "../../../../interface/VideoInterface";
import usePlayer from "../../../../hooks/usePlayer";
import VideoLikeMute from "../../../button/like-mute/VideoLikeMute";

import "./CardPosterVideo.css";

const CardPosterVideo = ({ video }: { video: VideoInfo }) => {
  const { videoRef } = usePlayer(video);
  return (
    <div className="card-poster-video-container card-poster-border-radius">
      <video
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        ref={videoRef}
        muted={false}
        preload="none"
      />
      <div className="card-poster-like-mute">
        <VideoLikeMute />
      </div>
    </div>
  );
};

CardPosterVideo.propTypes = {
  video: PropTypes.object.isRequired,
};

export default CardPosterVideo;

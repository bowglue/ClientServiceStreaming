import PropTypes from "prop-types";
import { LegacyRef } from "react";
import VideoLikeMute from "../../../button/like-mute/VideoLikeMute";

import "./CardPosterVideo.css";

const CardPosterVideo = ({
  videoRef,
}: {
  videoRef: LegacyRef<HTMLVideoElement>;
}) => {
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
  videoRef: PropTypes.object.isRequired,
};

export default CardPosterVideo;

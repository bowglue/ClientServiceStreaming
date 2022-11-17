import React, { LegacyRef } from "react";
import VideoInfo from "../../../../interface/VideoInterface";
import CardWideImage from "../../card-image/card-wide-image/CardWideImage";
import PropTypes from "prop-types";

import "./CardWideVideo.css";
import VideoLikeMute from "../../../button/like-mute/VideoLikeMute";

interface cardWideVideoPropsType {
  video: VideoInfo;
  videoRef: LegacyRef<HTMLVideoElement>;
  imageActive: boolean;
}

const CardWideVideo = ({
  video,
  videoRef,
  imageActive,
}: cardWideVideoPropsType) => {
  return (
    <div className={`card-wide-video-container`}>
      <video
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        ref={videoRef}
        preload="none"
      />
      <div className="card-wide-like-mute">
        <VideoLikeMute />
      </div>
    </div>
  );
};

CardWideVideo.propTypes = {
  imageActive: PropTypes.bool.isRequired,
  video: PropTypes.object.isRequired,
  videoRef: PropTypes.object.isRequired,
};

export default CardWideVideo;

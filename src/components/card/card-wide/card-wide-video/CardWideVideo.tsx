import PropTypes from "prop-types";
import VideoInfo from "../../../../interface/VideoInterface";
import usePlayer from "../../../../hooks/usePlayer";
import VideoLikeMute from "../../../button/like-mute/VideoLikeMute";

import "./CardWideVideo.css";

interface cardWideVideoPropsType {
  video: VideoInfo;
}

const CardWideVideo = ({ video }: cardWideVideoPropsType) => {
  const { videoRef } = usePlayer(video);
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
  video: PropTypes.object.isRequired,
};

export default CardWideVideo;

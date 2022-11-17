import PropTypes from "prop-types";
import { useContext } from "react";
import { WIDECONTEXT } from "../../../context/DesignContext";
import { DesignContext } from "../../../context/SliderContext";
import VideoInfo from "../../../interface/VideoInterface";
import usePlayer from "../../../utils/usePlayer";
import CardPosterVideo from "../card-video/card-poster-video/CardPosterVideo";
import CardWideVideo from "../card-video/card-wide-video/CardWideVideo";

interface cardActivePropsType {
  video: VideoInfo;
}

function CardActive({ video }: cardActivePropsType) {
  const designContext = useContext(DesignContext);
  const { imageActive, videoRef } = usePlayer(video);

  return (
    <>
      {designContext === WIDECONTEXT ? (
        <CardWideVideo
          imageActive={imageActive}
          video={video}
          videoRef={videoRef}
        />
      ) : (
        <CardPosterVideo videoRef={videoRef} />
      )}
    </>
  );
}

CardActive.propTypes = {
  video: PropTypes.object.isRequired,
};

export default CardActive;

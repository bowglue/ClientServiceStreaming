import PropTypes from "prop-types";
import { MouseEventHandler } from "react";
import VideoInfo from "../../../../interface/VideoInterface";
import CardPosterImage from "../../card-poster/card-poster-image/CardPosterImage";
import CardPosterVideo from "../../card-poster/card-poster-video/CardPosterVideo";

import "./CardPosterHover.css";

interface cardPosterHoverPropsType {
  cardActive: boolean;
  mouseEnter: MouseEventHandler<HTMLDivElement>;
  mouseLeave: MouseEventHandler<HTMLDivElement>;
  video: VideoInfo;
}

const CardPosterHover = ({
  cardActive,
  mouseEnter,
  mouseLeave,
  video,
}: cardPosterHoverPropsType) => {
  return (
    <div
      className={`card-poster-container`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        transition: "transform 500ms ease",
      }}
    >
      <CardPosterImage
        cardImage={video.poster_image}
        titleImage={video.title_image}
      />
      {cardActive && <CardPosterVideo video={video} />}
    </div>
  );
};

CardPosterHover.propTypes = {
  cardActive: PropTypes.bool.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
};

export default CardPosterHover;

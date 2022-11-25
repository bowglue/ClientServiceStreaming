import { LegacyRef, MouseEventHandler } from "react";
import VideoInfo from "../../../../interface/VideoInterface";
import PropTypes from "prop-types";

import "./CardWideHover.css";
import CardWideImage from "../../card-wide/card-wide-image/CardWideImage";
import CardWideVideo from "../../card-wide/card-wide-video/CardWideVideo";

interface cardWideHoverPropsType {
  cardActive: boolean;
  mouseEnter: MouseEventHandler<HTMLDivElement>;
  mouseLeave: MouseEventHandler<HTMLDivElement>;
  scaleOrigin: string;
  cardRef: LegacyRef<HTMLDivElement>;
  video: VideoInfo;
}

const CardWideHover = ({
  cardActive,
  mouseEnter,
  mouseLeave,
  scaleOrigin,
  cardRef,
  video,
}: cardWideHoverPropsType) => {
  return (
    <div
      className={`card-wide-container ${cardActive && "card-wide-active"}`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{
        transformOrigin: scaleOrigin,
        transition: "transform 300ms ease",
      }}
      ref={cardRef}
    >
      <CardWideImage
        cardImage={video.wide_image}
        titleImage={video.title_image}
      />
      {cardActive && <CardWideVideo video={video} />}
    </div>
  );
};

CardWideHover.propTypes = {
  cardActive: PropTypes.bool.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  scaleOrigin: PropTypes.string.isRequired,
  cardRef: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
};

export default CardWideHover;

import PropTypes from "prop-types";
import { useContext } from "react";
import { CardActiveContext } from "../../../../context/SliderContext";
import CardPosterButton from "../../../button/card-poster-button/CardPosterButton";
import VideoGenre from "../../../video-genre/VideoGenre";

import "./CardPosterImage.css";

interface CardPosterImagePropsType {
  cardImage: string;
  titleImage: string;
}

const CardPosterImage = ({
  cardImage,
  titleImage,
}: CardPosterImagePropsType) => {
  const cardActive = useContext(CardActiveContext);
  return (
    <div
      className={`card-poster-image-container `}
      style={{ borderRadius: cardActive ? "10px 0 0 10px" : "10px" }}
    >
      <img
        className="card-poster-image"
        style={{ width: "100%" }}
        src={"data:image/webp;base64," + cardImage}
        alt="Poster"
      />
      <div
        className={`card-poster-gradient-image-default ${
          cardActive && "card-poster-gradient-image-active"
        }`}
      ></div>
      <div
        className={`card-poster-wrapper ${
          cardActive && "card-poster-wrapper-animation"
        }`}
      >
        <div className="card-poster-bottom-wrapper">
          <div className="card-poster-title-image">
            <img
              style={{ width: "100%" }}
              src={"data:image/webp;base64," + titleImage}
              alt="title"
            />
          </div>

          <div
            className={`card-poster-bottom-info ${
              cardActive && "card-poster-bottom-info-animation"
            }`}
          >
            <VideoGenre />
            <CardPosterButton />
          </div>
        </div>
      </div>
    </div>
  );
};

CardPosterImage.propTypes = {
  cardImage: PropTypes.string.isRequired,
  titleImage: PropTypes.string.isRequired,
};

export default CardPosterImage;

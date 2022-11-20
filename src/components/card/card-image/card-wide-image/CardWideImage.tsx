import PropTypes from "prop-types";
import { useContext } from "react";

import { CardActiveContext } from "../../../../context/SliderContext";
import "./CardWideImage.css";

interface CardWideImagetPropsType {
  cardImage: string;
  titleImage: string;
}

const CardWideImage = ({ cardImage, titleImage }: CardWideImagetPropsType) => {
  const cardActive = useContext(CardActiveContext);
  return (
    <div
      className={`card-wide-image-container ${
        cardActive && "card-wide-image-container-active"
      }`}
    >
      <img
        className={`${
          cardActive ? " card-wide-image-active" : "card-wide-image"
        }`}
        style={{ width: "100%", objectFit: "cover" }}
        src={"data:image/webp;base64," + cardImage}
        alt="Movie"
      />

      <div className="card-wide-wrapper-container">
        <div className="card-wide-wrapper-bottom">
          <img
            style={{ width: "100%" }}
            src={"data:image/webp;base64," + titleImage}
            alt="Movie"
          />
        </div>
      </div>
    </div>
  );
};

CardWideImage.propTypes = {
  cardImage: PropTypes.string.isRequired,
  titleImage: PropTypes.string.isRequired,
};

export default CardWideImage;

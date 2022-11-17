import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { POSTERCONTEXT, WIDECONTEXT } from "../../../context/DesignContext";
import {
  CardActiveContext,
  DesignContext,
} from "../../../context/SliderContext";
import VideoInfo from "../../../interface/VideoInterface";
import CardHoverController from "../card-hover-controller/CardHoverController";
import CardHoverPosterController from "../card-hover-controller/CardHoverPosterController";
import CardHoverWideController from "../card-hover-controller/CardHoverWideController";
import CardPosterHover from "../card-hover/card-poster-hover/CardPosterHover";
import CardWideHover from "../card-hover/card-wide-hover/CardWideHover";
import "./CardSlider.css";

interface cardSliderPropsType {
  video: VideoInfo;
  scaleOrigin: string;
  sliderRef: HTMLDivElement;
  width: number;
  padding: string;
  index: number;
}

const CardSlider = ({
  video,
  scaleOrigin,
  sliderRef,
  width,
  padding,
  index,
}: cardSliderPropsType) => {
  const [cardActive, setCardActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverController = useRef<CardHoverController | null>(null);
  const designContext = useContext(DesignContext);

  useEffect(() => {
    handleHoverController();
  }, []);

  const handleHoverController = (): void => {
    switch (designContext) {
      case WIDECONTEXT:
        hoverController.current = new CardHoverWideController(300);
        break;
      case POSTERCONTEXT:
        hoverController.current = new CardHoverPosterController(500);
        break;

      default:
        break;
    }
  };

  const _handleMouseEnter = (): void => {
    hoverController.current?.handleMouseEnter(
      handleCardActive,
      cardRef.current!,
      sliderRef,
      index
    );
  };

  const _handleMouseLeave = (): void => {
    hoverController.current?.handleMouseLeave(
      handleCardActive,
      cardRef.current!,
      sliderRef
    );
  };

  const handleCardActive = (isCardActive: boolean): void => {
    setCardActive(isCardActive);
  };

  return (
    <div
      className="card-slider-container"
      style={{ width: `${width}%`, padding: padding }}
    >
      {designContext === WIDECONTEXT ? (
        <CardActiveContext.Provider value={cardActive}>
          <CardWideHover
            video={video}
            scaleOrigin={scaleOrigin}
            cardActive={cardActive}
            mouseEnter={_handleMouseEnter}
            mouseLeave={_handleMouseLeave}
            cardRef={cardRef}
          />
        </CardActiveContext.Provider>
      ) : (
        <CardActiveContext.Provider value={cardActive}>
          <CardPosterHover
            video={video}
            cardActive={cardActive}
            mouseEnter={_handleMouseEnter}
            mouseLeave={_handleMouseLeave}
          />
        </CardActiveContext.Provider>
      )}
    </div>
  );
};

CardSlider.propTypes = {
  scaleOrigin: PropTypes.string.isRequired,
  video: PropTypes.object.isRequired,
  sliderRef: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  padding: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardSlider;

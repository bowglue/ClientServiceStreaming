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
import CardLoading from "../card-loading/CardLoading";
import "./CardMain.css";

interface cardSliderPropsType {
  video: VideoInfo;
  scaleWideOrigin: string;
  translatePosterCards: number;
  sliderMainRef: HTMLDivElement;
  width: string;
  padding: string;
  index: number;
  loading: boolean;
}

const CardMain = ({
  video,
  scaleWideOrigin,
  translatePosterCards,
  sliderMainRef,
  width,
  padding,
  index,
  loading,
}: cardSliderPropsType) => {
  const [cardActive, setCardActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverController = useRef<CardHoverController>();
  const designContext = useContext(DesignContext);

  useEffect(() => {
    handleHoverController();
  }, []);

  const handleHoverController = (): void => {
    switch (designContext) {
      case POSTERCONTEXT:
        hoverController.current = new CardHoverPosterController(500);
        break;
      default:
        hoverController.current = new CardHoverWideController(300);
        break;
    }
  };

  const _handleMouseEnter = (): void => {
    hoverController.current?.handleMouseEnter(
      handleCardActive,
      translatePosterCards,
      cardRef.current!,
      sliderMainRef,
      index
    );
  };

  const _handleMouseLeave = (): void => {
    hoverController.current?.handleMouseLeave(
      handleCardActive,
      cardRef.current!,
      sliderMainRef
    );
  };

  const handleCardActive = (isCardActive: boolean): void => {
    setCardActive(isCardActive);
  };

  if (loading)
    return (
      <div
        className={`card-main-container ${index + 1}`}
        style={{ width: width, padding: padding }}
      >
        <CardLoading designContext={designContext} />
      </div>
    );

  return (
    <div
      className={`card-main-container ${index + 1}`}
      style={{ width: width, padding: padding }}
    >
      {designContext === WIDECONTEXT ? (
        <CardActiveContext.Provider value={cardActive}>
          <CardWideHover
            video={video}
            scaleOrigin={scaleWideOrigin}
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

CardMain.propTypes = {
  scaleWideOrigin: PropTypes.string.isRequired,
  translatePosterCards: PropTypes.number.isRequired,
  video: PropTypes.object.isRequired,
  // sliderMainRef: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardMain;

import { useContext, useEffect, useRef } from "react";
import SliderNextController from "./SliderNextController";
import useSliderParams from "./useSliderParams";

import CardSlider from "../card/card-slider/CardSlider";
import "./Slider.css";
import { DesignContext } from "../../context/SliderContext";
import SliderButton from "../button/slider-button/SliderButton";
import useSliderReactive from "./useSliderReactive";

const Slider = () => {
  const designContext = useContext(DesignContext);
  const sliderReactive = useSliderReactive();
  const { slide, videos, translation, sliderController } = useSliderParams(
    designContext,
    sliderReactive
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sliderController.initializeVideos();
  }, []);

  const handleChangePage = (incrementator: number) => {
    if (!slide) {
      sliderController.translatePage(incrementator);
    }
  };

  return (
    <div
      className="slider-container"
      style={{ padding: sliderReactive.sliderPadding }}
    >
      <SliderButton
        buttonWidth={sliderReactive.buttonWidth}
        isVisible={sliderController instanceof SliderNextController}
        onChangePage={handleChangePage}
      />

      <div
        className={`slider-content ${slide ? "slider-animation" : ""} `}
        style={{ transform: translation }}
        ref={sliderRef}
      >
        {videos.length > 0
          ? videos.map((video, index) => {
              return (
                <CardSlider
                  key={index}
                  video={video}
                  scaleWideOrigin={sliderController.scaleWideOrigin(index)}
                  translatePosterCards={sliderController.translatePosterCards(
                    index
                  )}
                  sliderRef={sliderRef.current!}
                  width={sliderReactive.cardWidth!}
                  padding={sliderReactive.itemPadding}
                  index={index}
                />
              );
            })
          : Array.from(Array(1).keys()).map((number, index) => {
              return <div key={index} className="spinner"></div>;
            })}
      </div>
    </div>
  );
};

export default Slider;

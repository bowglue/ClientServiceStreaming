import { useContext, useEffect, useRef } from "react";
import SliderNextController from "./SliderNextController";
import useSliderParams from "./useSliderParams";

import CardSlider from "../card/card-slider/CardSlider";
import "./Slider.css";
import { DesignContext } from "../../context/SliderContext";
import SliderButton from "../button/slider-button/SliderButton";

const Slider = () => {
  const designContext = useContext(DesignContext);
  const { sliderReactive, slide, videos, translation, sliderController } =
    useSliderParams(designContext);
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
    <div className="row-container">
      <div>Title</div>
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
                    video={video}
                    scaleOrigin={sliderController.scaleOrigin(index)}
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
    </div>
  );
};

export default Slider;

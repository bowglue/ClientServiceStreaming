import { useContext, useEffect, useRef } from "react";

import CardSlider from "../../../../components/card/card-main/CardMain";
import { DesignContext } from "../../../../context/SliderContext";
import SliderNextController from "../../controllers/SliderNextController";
import useSliderParams from "../../hooks/useSliderParams";
import SliderButton from "../slider-button/SliderButton";

import "./SliderMain.css";

const SliderMain = () => {
  const designContext = useContext(DesignContext);
  const { sliderParams, sliderController, sliderReactiveCss } =
    useSliderParams(designContext);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sliderController.initializeVideos();
  }, []);

  const handleChangePage = (incrementator: number) => {
    if (!sliderParams.slideRef.current) {
      sliderController.translatePage(incrementator);
    }
  };

  return (
    <div
      className="slider-main-container"
      style={{ padding: sliderReactiveCss.sliderPadding }}
    >
      <SliderButton
        buttonWidth={sliderReactiveCss.buttonWidth}
        isVisible={sliderController instanceof SliderNextController}
        onChangePage={handleChangePage}
      />

      <div
        className={`slider-content ${
          sliderParams.slideRef.current ? "slider-animation" : ""
        } `}
        style={{ transform: sliderParams.translation }}
        ref={sliderRef}
      >
        {sliderParams.videos.length > 0
          ? sliderParams.videos.map((video, index) => {
              return (
                <CardSlider
                  key={index}
                  video={video}
                  scaleWideOrigin={sliderController.scaleWideOrigin(index)}
                  translatePosterCards={sliderController.translatePosterCards(
                    index
                  )}
                  sliderRef={sliderRef.current!}
                  width={sliderReactiveCss.cardWidth!}
                  padding={sliderReactiveCss.itemPadding}
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

export default SliderMain;

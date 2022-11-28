import { useContext, useEffect, useRef } from "react";
import CardSlider from "../../../../components/card/card-main/CardMain";
import { DesignContext } from "../../../../context/SliderContext";
import VideoInfo from "../../../../interface/VideoInterface";
import SliderNextController from "../../controllers/SliderNextController";
import useSliderParams from "../../hooks/useSliderParams";
import SliderButton from "../slider-button/SliderButton";

import "./SliderMain.css";

const SliderMain = () => {
  const designContext = useContext(DesignContext);
  const { sliderParams, sliderController, sliderReactiveCss } =
    useSliderParams(designContext);
  const sliderMainRef = useRef<HTMLDivElement>(null);

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
        ref={sliderMainRef}
      >
        {sliderParams.videos.map((video, index) => {
          return (
            <CardSlider
              key={index}
              video={video as VideoInfo}
              scaleWideOrigin={sliderController.scaleWideOrigin(index)}
              translatePosterCards={sliderController.translatePosterCards()}
              sliderMainRef={sliderMainRef.current!}
              width={sliderReactiveCss.cardWidth!}
              padding={sliderReactiveCss.itemPadding}
              index={index}
              loading={video.name ? false : true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SliderMain;

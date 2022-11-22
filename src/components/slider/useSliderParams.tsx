import { useRef, useState } from "react";
import VideoInfo from "../../interface/VideoInterface";
import SliderController from "./SliderController";
import SliderEntryController from "./SliderEntryController";
import useSliderReactive from "./useSliderReactive";

const useSliderParams = (designContext: string) => {
  const { sliderReactiveCss, sliderReactiveInfoRef } = useSliderReactive();
  const totalCardsRef = useRef<number>(0);
  const cardIncrementRef = useRef<number>(0);
  const slideRef = useRef<boolean>(false);
  const sliderControllerRef = useRef<SliderController>(
    new SliderEntryController()
  );
  const [translation, setTranslation] = useState<string>("");
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleTranslation = (translation: string): void => {
    setTranslation(translation);
  };
  const handleVideos = (videos: VideoInfo[]): void => {
    setVideos(videos);
  };

  const sliderParams = {
    slideRef,
    totalCardsRef,
    cardIncrementRef,
    sliderControllerRef,
    translation,
    videos,
    handleTranslation,
    handleVideos,
  };

  sliderControllerRef.current.initializeSlider(
    sliderParams,
    sliderReactiveInfoRef,
    designContext
  );

  return {
    sliderParams: sliderParams,
    sliderController: sliderControllerRef.current,
    sliderReactiveCss: sliderReactiveCss,
  };
};

export default useSliderParams;

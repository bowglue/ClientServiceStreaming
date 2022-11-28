import { useRef, useState } from "react";
import { SliderParamsInterface } from "../../../interface/SliderParamsInterface";
import { SliderReactiveInfoInterface } from "../../../interface/SliderReactiveInterface";
import VideoInfo from "../../../interface/VideoInterface";
import SliderController from "../controllers/SliderController";
import SliderEntryController from "../controllers/SliderEntryController";
import SliderNextController from "../controllers/SliderNextController";
import useSliderReactive from "./useSliderReactive";

const useSliderParams = (designContext: string) => {
  const emptyVideo: VideoInfo = {
    name: "",
    wide_image: "",
    title_image: "",
    poster_image: "",
    focus_image: "",
  };
  const { sliderReactiveCss, sliderReactiveInfoRef } = useSliderReactive();
  const totalCardsRef = useRef<number>(0);
  const cardIncrementRef = useRef<number>(0);
  const slideRef = useRef<boolean>(false);
  const [translation, setTranslation] = useState<string>("");
  const [videos, setVideos] = useState<VideoInfo[]>(Array(7).fill(emptyVideo));

  const handleTranslation = (translation: string): void => {
    setTranslation(translation);
  };
  const handleVideos = (videos: VideoInfo[]): void => {
    setVideos(videos);
  };
  const handleSliderController = (
    sliderParams: SliderParamsInterface,
    sliderReactiveInfoRef: React.MutableRefObject<SliderReactiveInfoInterface>,
    designContext: string
  ) => {
    sliderControllerRef.current = new SliderNextController(
      sliderParams,
      sliderReactiveInfoRef,
      designContext
    );
  };

  const sliderParams = {
    slideRef,
    totalCardsRef,
    cardIncrementRef,
    translation,
    videos,
    handleTranslation,
    handleVideos,
    handleSliderController,
  };

  const sliderControllerRef = useRef<SliderController>(
    new SliderEntryController(
      sliderParams,
      sliderReactiveInfoRef,
      designContext
    )
  );

  return {
    sliderParams: sliderParams,
    sliderController: sliderControllerRef.current,
    sliderReactiveCss: sliderReactiveCss,
  };
};

export default useSliderParams;

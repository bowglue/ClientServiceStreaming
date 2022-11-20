import { ComponentPropsWithRef } from "@react-spring/types";
import { useState } from "react";
import VideoInfo from "../../interface/VideoInterface";
import SliderController from "./SliderController";
import SliderEntryController from "./SliderEntryController";
import useSliderReactive from "./useSliderReactive";

const useSliderParams = (designContext: string, sliderReactive: any) => {
  const sliderEntryController = new SliderEntryController();

  const [slide, setSlide] = useState<boolean>(false);
  const [translation, setTranslation] = useState<string>("");
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [cardIncremontator, setCardIncremontator] = useState<number>(0);
  const [requestedCards, setRequestedCards] = useState<boolean[]>([]);
  const [sliderController, setSliderController] = useState<SliderController>(
    sliderEntryController
  );

  const sliderParams = {
    sliderReactive,
    slide,
    videos,
    totalCards,
    translation,
    page,
    cardIncremontator,
    requestedCards,
    sliderController,
    setSlide,
    setVideos,
    setTotalCards,
    setTranslation,
    setPage,
    setCardIncremontator,
    setRequestedCards,
    setSliderController,
  };

  sliderController.setSliderParams(sliderParams, designContext);

  return sliderParams;
};

export default useSliderParams;

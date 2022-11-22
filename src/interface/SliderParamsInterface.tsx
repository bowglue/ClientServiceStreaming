import SliderController from "../components/slider/SliderController";
import VideoInfo from "./VideoInterface";

export interface SliderParamsInterface {
  slideRef: React.MutableRefObject<boolean>;
  totalCardsRef: React.MutableRefObject<number>;
  cardIncrementRef: React.MutableRefObject<number>;
  sliderControllerRef: React.MutableRefObject<SliderController>;
  translation: string;
  videos: VideoInfo[];
  handleTranslation: Function;
  handleVideos: Function;
}

import VideoInfo from "./VideoInterface";

export interface SliderParamsInterface {
  slideRef: React.MutableRefObject<boolean>;
  totalCardsRef: React.MutableRefObject<number>;
  cardIncrementRef: React.MutableRefObject<number>;
  translation: string;
  videos: VideoInfo[];
  handleTranslation: Function;
  handleVideos: Function;
  handleSliderController: Function;
}

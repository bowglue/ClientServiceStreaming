import axios from "axios";
import { SliderParamsInterface } from "../../interface/SliderParamsInterface";
import { SliderReactiveInfoInterface } from "../../interface/SliderReactiveInterface";
import VideoInfo from "../../interface/VideoInterface";

export abstract class SliderController {
  constructor(
    sliderParams: SliderParamsInterface,
    sliderReactive: React.MutableRefObject<SliderReactiveInfoInterface>,
    designContext: string
  ) {
    this.sliderParams = sliderParams;
    this.sliderReactive = sliderReactive;
    this.designContext = designContext;
  }

  sliderReactive!: React.MutableRefObject<SliderReactiveInfoInterface>;
  sliderParams!: SliderParamsInterface;
  cardToSlide: number = 0;
  designContext!: string;
  requestDuration!: number;

  translatePage(incrementator: number): void {
    this.cardsController(incrementator);
    this.sliderParams.slideRef.current = true;
  }
  resetContentPosition(incrementator: number): void {
    this.sliderParams.slideRef.current = false;
    const translateLength = `translateX(${this.sliderReactive.current.translateLength}%)`;
    this.sliderParams.handleTranslation(translateLength);
  }
  updateVideos(arr: VideoInfo[], incrementator: number = 0): void {}
  scaleWideOrigin(index: number): string {
    return "";
  }
  translatePosterCards(index: number): string {
    return "";
  }

  handleTranslateDurationContentPosition(incrementator: number): void {
    const timeoutLength =
      this.requestDuration <= 700
        ? 700 - this.requestDuration
        : this.requestDuration;
    setTimeout(() => {
      this.resetContentPosition(incrementator);
    }, timeoutLength);
  }

  initializeVideos(): void {
    this.fetchVideo(0, this.sliderReactive.current.cardsPerPage * 2).then(
      (data) => {
        this.sliderParams.handleVideos(data.content);
        this.sliderParams.totalCardsRef.current = data.totalElements;
        this.cardsController();
      }
    );
  }

  async fetchVideo(offset: number, nbElement: number): Promise<any> {
    const requestStart = performance.now();
    const { data } = await axios({
      method: "get",
      url: "/api/v1/movie/" + this.designContext,
      params: {
        offset: offset,
        size: nbElement,
      },
    });
    const requestEnd = performance.now();
    this.requestDuration = requestEnd - requestStart;
    console.log(this.requestDuration);

    return data;
  }

  setVideosRender(arr: VideoInfo[]): VideoInfo[] {
    return [arr[arr.length - 1], ...arr, arr[0]];
  }

  cardsController(incrementator: number = 1): void {
    const { _cardIncremontator, _cardToSlide } =
      this.updateCardIncrementator(incrementator);
    this.sliderParams.cardIncrementRef.current = _cardIncremontator;
    this.cardToSlide = _cardToSlide;
  }

  updateCardIncrementator(incrementator: number): any {
    let cardToSlide!: number;

    if (!this.sliderParams.cardIncrementRef.current) {
      return {
        _cardIncremontator: this.sliderReactive.current.cardsPerPage,
        _cardToSlide: 0,
      };
    }

    let cardIncremontator =
      this.sliderParams.cardIncrementRef.current +
      incrementator * this.sliderReactive.current.cardsPerPage;

    if (
      cardIncremontator ===
      this.sliderParams.totalCardsRef.current +
        this.sliderReactive.current.cardsPerPage
    ) {
      cardIncremontator = this.sliderReactive.current.cardsPerPage;
    }

    if (
      cardIncremontator <= this.sliderParams.totalCardsRef.current &&
      cardIncremontator >= this.sliderReactive.current.cardsPerPage
    ) {
      cardToSlide = this.sliderReactive.current.cardsPerPage;
    }

    if (cardIncremontator > this.sliderParams.totalCardsRef.current) {
      cardToSlide =
        this.sliderReactive.current.cardsPerPage ===
        cardIncremontator - this.sliderParams.totalCardsRef.current
          ? this.sliderReactive.current.cardsPerPage
          : this.sliderReactive.current.cardsPerPage -
            (cardIncremontator - this.sliderParams.totalCardsRef.current);
      cardIncremontator = this.sliderParams.totalCardsRef.current;
    }

    if (
      cardIncremontator < this.sliderReactive.current.cardsPerPage &&
      cardIncremontator > 0
    ) {
      cardToSlide = cardIncremontator;
      cardIncremontator = this.sliderReactive.current.cardsPerPage;
    }

    if (cardIncremontator <= 0) {
      cardToSlide = this.sliderReactive.current.cardsPerPage;
      cardIncremontator = this.sliderParams.totalCardsRef.current;
    }

    return {
      _cardIncremontator: cardIncremontator,
      _cardToSlide: cardToSlide,
    };
  }

  offsetRequestData(cardIncremontator: number, incrementator: number): number {
    if (incrementator < 0) {
      const nextCards =
        this.updateCardIncrementator(incrementator)._cardIncremontator;
      return nextCards - this.sliderReactive.current.cardsPerPage;
    }

    if (cardIncremontator < this.sliderParams.totalCardsRef.current)
      return cardIncremontator;
    return 0;
  }

  numberRequestData(incrementator: number): number {
    return this.updateCardIncrementator(incrementator)._cardToSlide;
  }

  rotateArray = (arr: VideoInfo[], count: number) => {
    return [...arr.slice(count, arr.length), ...arr.slice(0, count)];
  };
}

export default SliderController;

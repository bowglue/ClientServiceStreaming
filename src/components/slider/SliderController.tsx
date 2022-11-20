import axios from "axios";
import VideoInfo from "../../interface/VideoInterface";

export abstract class SliderController {
  sliderReactive: any;
  slide!: boolean;
  videos!: VideoInfo[];
  totalCards!: number;
  translation!: string;
  page!: number;
  nextPage!: number;
  cardIncremontator!: number;
  sliderController!: SliderController;
  cardToSlide: number = 0;
  designContext!: string;

  setSlide: any;
  setVideos: any;
  setTotalCards: any;
  setTranslation: any;
  setPage: any;
  setCardIncremontator: any;
  setSliderController: any;

  resetContentPosition(incrementator: number): void {}
  handleUpdateRenderImage(incrementator: number) {}
  updateRenderImageRight(): void {}
  updateRenderImageLeft(): void {}
  resetCardPosition(): void {}
  updateVideos(arr: VideoInfo[], incrementator: number = 0): void {}
  scaleWideOrigin(index: number): string {
    return "";
  }
  translatePosterCards(index: number): string {
    return "";
  }

  translatePage(incrementator: number): void {
    this.pageController(incrementator);
    this.cardsController(incrementator);
  }

  initializeVideos(): void {
    this.fetchVideo(0, this.sliderReactive.cardsPerPage * 2).then((videos) => {
      this.setVideos(videos);
      this.cardsController();
    });
  }

  setSliderParams(sliderParams: any, designContext: string): void {
    this.sliderReactive = sliderParams.sliderReactive;
    this.slide = sliderParams.slide;
    this.videos = sliderParams.videos;
    this.totalCards = sliderParams.totalCards;
    this.translation = sliderParams.translation;
    this.page = sliderParams.page;
    this.cardIncremontator = sliderParams.cardIncremontator;
    this.sliderController = sliderParams.sliderController;

    this.setSlide = sliderParams.setSlide;
    this.setVideos = sliderParams.setVideos;
    this.setTotalCards = sliderParams.setTotalCards;
    this.setTranslation = sliderParams.setTranslation;
    this.setPage = sliderParams.setPage;
    this.setCardIncremontator = sliderParams.setCardIncremontator;
    this.setSliderController = sliderParams.setSliderController;

    this.designContext = designContext;
  }

  async fetchVideo(offset: number, nbElement: number): Promise<VideoInfo[]> {
    const { data } = await axios({
      method: "get",
      url: "/api/v1/movie/" + this.designContext,
      params: {
        offset: offset,
        size: nbElement,
      },
    });
    this.totalCards = data.totalElements;
    this.setTotalCards(this.totalCards);

    return data.content;
  }

  setVideosRender(arr: VideoInfo[]): void {
    const videosRender = [arr[arr.length - 1], ...arr, arr[0]];
    this.setVideos(videosRender);
  }

  pageController(incrementator: number): void {
    const _maxPages = this.getMaxPages();

    this.page =
      incrementator > 0
        ? (this.page + 1) % _maxPages
        : (this.page - 1 + _maxPages) % _maxPages;

    this.nextPage =
      incrementator > 0
        ? (this.page + 1) % _maxPages
        : (this.page - 1 + _maxPages) % _maxPages;

    // console.log("Page: " + this.page);
    // console.log("Next Page: " + this.nextPage);

    this.setPage(this.page);
  }

  getMaxPages(): number {
    return Math.ceil(this.totalCards / this.sliderReactive.cardsPerPage);
  }

  cardsController(incrementator: number = 1): void {
    const { _cardIncremontator, _cardToSlide } =
      this.updateCardIncrementator(incrementator);
    this.cardIncremontator = _cardIncremontator;
    this.cardToSlide = _cardToSlide;
    console.log("CardIncrementator: " + this.cardIncremontator);

    this.setCardIncremontator(this.cardIncremontator);
  }

  updateCardIncrementator(incrementator: number): any {
    let cardToSlide!: number;

    if (!this.cardIncremontator)
      return {
        _cardIncremontator: this.sliderReactive.cardsPerPage,
        _cardToSlide: 0,
      };

    let cardIncremontator =
      this.cardIncremontator + incrementator * this.sliderReactive.cardsPerPage;

    if (
      cardIncremontator ===
      this.totalCards + this.sliderReactive.cardsPerPage
    ) {
      cardIncremontator = this.sliderReactive.cardsPerPage;
    }

    if (
      cardIncremontator <= this.totalCards &&
      cardIncremontator >= this.sliderReactive.cardsPerPage
    ) {
      cardToSlide = this.sliderReactive.cardsPerPage;
    }

    if (cardIncremontator > this.totalCards) {
      cardToSlide =
        this.sliderReactive.cardsPerPage === cardIncremontator - this.totalCards
          ? this.sliderReactive.cardsPerPage
          : this.sliderReactive.cardsPerPage -
            (cardIncremontator - this.totalCards);
      cardIncremontator = this.totalCards;
    }

    if (
      cardIncremontator < this.sliderReactive.cardsPerPage &&
      cardIncremontator > 0
    ) {
      cardToSlide = cardIncremontator;
      cardIncremontator = this.sliderReactive.cardsPerPage;
    }

    if (cardIncremontator <= 0) {
      cardToSlide = this.sliderReactive.cardsPerPage;
      cardIncremontator = this.totalCards;
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
      return nextCards - this.sliderReactive.cardsPerPage;
    }

    if (cardIncremontator < this.totalCards) return cardIncremontator;
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

import SliderController from "./SliderController";
import VideoInfo from "../../interface/VideoInterface";

export class SliderNextController extends SliderController {
  videosNext!: VideoInfo[];
  override translatePage(incrementator: number): void {
    super.translatePage(incrementator);
    const translate = `translateX(${
      -1 * incrementator * (this.sliderReactive.cardWidth * this.cardToSlide) -
      (100 + this.sliderReactive.cardWidth)
    }%)`;

    this.setTranslation(translate);
    this.setSlide(true);

    this.fetchVideo(
      this.offsetRequestData(this.cardIncremontator, incrementator),
      this.numberRequestData(incrementator)
    ).then((videos) => {
      // console.log(videos);
      this.videosNext = videos;
      this.updateVideos(videos, incrementator);
    });

    setTimeout(() => {
      this.resetContentPosition(incrementator);
    }, 700);
  }

  override resetContentPosition(incrementator: number): void {
    const translate = `translateX(${this.sliderReactive.translateLength}%)`;
    this.videos = this.videos.slice(1, -1);
    this.handleUpdateRenderImage(incrementator);

    this.setTranslation(translate);
    this.setSlide(false);
  }

  override handleUpdateRenderImage(incrementator: number): void {
    if (incrementator > 0) {
      this.updateRenderImageRight();
    } else {
      this.updateRenderImageLeft();
    }

    if (this.videosNext.length < this.sliderReactive.cardsPerPage) {
      console.log("test");

      this.videos = this.videos.slice(
        0,
        this.videos.length -
          (this.sliderReactive.cardsPerPage - this.videosNext.length)
      );
    }
    console.log(this.videos);
    this.setVideosRender(this.videos);
  }

  override updateRenderImageRight(): void {
    this.videos = this.rotateArray(this.videos, this.cardToSlide);
  }

  override updateRenderImageLeft(): void {
    this.videos = this.rotateArray(this.videos, this.cardToSlide * -1);
  }

  override handleResize(): void {
    super.handleResize();

    if (
      this.sliderReactive.prevCardsPerPage !== this.sliderReactive.cardsPerPage
    ) {
      const nbCards =
        this.sliderReactive.prevCardsPerPage - this.sliderReactive.cardsPerPage;
      this.updateCardIncrementatorOnResize();
      this.updateTranslationOnResize();

      if (
        this.sliderReactive.prevCardsPerPage < this.sliderReactive.cardsPerPage
      ) {
        this.fetchVideo(
          this.offsetRequestData(
            this.cardIncremontator - 2 * this.sliderReactive.cardsPerPage,
            1
          ),
          Math.abs(nbCards)
        ).then((videosBefore) => {
          this.fetchVideo(
            this.offsetRequestData(this.cardIncremontator + 2, 1),
            2 * Math.abs(nbCards)
          ).then((videosAfter) => {
            console.log(videosBefore);
            console.log(videosAfter);

            this.videos = [
              ...videosBefore,
              ...this.videos.slice(1, -1),
              ...videosAfter,
            ];
            this.setVideosRender(this.videos);
          });
        });
        return;
      }
      this.videos = this.videos
        .slice(1, -1)
        .slice(nbCards, this.sliderReactive.cardsPerPage * 3 + nbCards);
      this.setVideosRender(this.videos);
      //this.rotateSliderOnResize(this.videos.slice(1, -1), nbCards);
    }
  }

  override updateVideos(arr: VideoInfo[], incrementator: number = 0): void {
    this.videos = this.videos.slice(1, -1);
    if (incrementator > 0) {
      if (this.videos.length === 3 * this.sliderReactive.cardsPerPage) {
        this.videos = [
          ...arr,
          ...this.videos.slice(arr.length, this.videos.length),
        ];
      } else {
        const nbCards = this.sliderReactive.cardsPerPage - this.cardToSlide;
        this.videos = [
          ...arr.slice(nbCards, arr.length),
          ...this.videos.slice(this.cardToSlide, this.videos.length),
          ...arr.slice(0, nbCards),
        ];
        console.log(this.videos);
      }
    } else {
      if (this.videos.length === 3 * this.sliderReactive.cardsPerPage) {
        this.videos = [
          ...this.videos.slice(0, this.videos.length - arr.length),
          ...arr,
        ];
      } else {
        this.videos = [
          ...arr.slice(this.cardToSlide, arr.length),
          ...this.videos.slice(this.cardToSlide, this.videos.length),
          ...arr.slice(0, this.cardToSlide),
        ];
      }
    }

    this.setVideosRender(this.videos);
  }

  // rotateSliderOnResize(videos: VideoInfo[], nbCards: number): void {
  //   this.videos = this.rotateArray(videos, nbCards).slice(
  //     0,
  //     this.sliderReactive.cardsPerPage * 3
  //   );

  //   this.updateTranslationOnResize();
  //   this.setVideosRender(this.videos);
  // }

  updateTranslationOnResize(): void {
    switch (this.sliderReactive.cardsPerPage) {
      case 2:
        this.setTranslation(`translateX(${-150}%)`);
        break;
      case 4:
        this.setTranslation(`translateX(${-125}%)`);
        break;
      case 6:
        this.setTranslation(`translateX(${-116.667}%)`);
        break;
    }
  }

  updateCardIncrementatorOnResize(): void {
    if (
      this.sliderReactive.prevCardsPerPage > this.sliderReactive.cardsPerPage
    ) {
      this.cardIncremontator =
        this.cardIncremontator -
        (this.sliderReactive.prevCardsPerPage -
          this.sliderReactive.cardsPerPage);
    }

    if (
      this.sliderReactive.prevCardsPerPage < this.sliderReactive.cardsPerPage
    ) {
      this.cardIncremontator =
        this.cardIncremontator +
        (this.sliderReactive.cardsPerPage -
          this.sliderReactive.prevCardsPerPage);
    }
    console.log("CardIncrementator: " + this.cardIncremontator);

    this.setCardIncremontator(this.cardIncremontator);
  }

  override scaleOrigin(index: number): string {
    switch (index) {
      case this.sliderReactive.cardsPerPage + 1:
        return "0% 50%";
      case 2 * this.sliderReactive.cardsPerPage:
        return "100% 50%";
      default:
        return "50% 50%";
    }
  }
}

export default SliderNextController;

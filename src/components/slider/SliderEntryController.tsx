import VideoInfo from "../../interface/VideoInterface";
import SliderController from "./SliderController";
import SliderNextController from "./SliderNextController";

export class SliderEntryController extends SliderController {
  override translatePage(incrementator: number): void {
    super.translatePage(incrementator);

    this.setSliderController(new SliderNextController());
    const translate = `translateX(${
      incrementator * -(this.sliderReactive.cardWidth * this.cardToSlide)
    }%)`;

    this.setTranslation(translate);
    this.setSlide(true);

    this.fetchVideo(
      this.cardIncremontator,
      this.sliderReactive.cardsPerPage
    ).then((videos) => {
      this.updateVideos(videos);
      setTimeout(() => {
        this.resetContentPosition(incrementator);
      }, 700);
    });
  }

  override resetContentPosition(incrementor: number): void {
    const translate = `translateX(${this.sliderReactive.translateLength}%)`;
    this.setVideosRender(this.videos);

    this.setTranslation(translate);
    this.setSlide(false);
  }

  // override handleResize(): void {
  //   super.handleResize();
  //   if (
  //     this.sliderReactive.prevCardsPerPage !== this.sliderReactive.cardsPerPage
  //   ) {
  //     this.videos = this.videos.slice(0, this.sliderReactive.cardsPerPage * 2);
  //     this.setVideos(this.videos);

  //     this.cardIncremontator =
  //       this.cardIncremontator +
  //       this.sliderReactive.cardsPerPage -
  //       this.sliderReactive.prevCardsPerPage;
  //     this.setCardIncremontator(this.cardIncremontator);
  //   }

  //   if (
  //     this.sliderReactive.prevCardsPerPage < this.sliderReactive.cardsPerPage
  //   ) {
  //     const nbCards =
  //       2 *
  //       (this.sliderReactive.cardsPerPage -
  //         this.sliderReactive.prevCardsPerPage);

  //     this.fetchVideo(
  //       this.offsetRequestData(this.sliderReactive.prevCardsPerPage * 2, 1),
  //       nbCards
  //     ).then((videos) => {
  //       console.log(videos);
  //       this.videos = [...this.videos, ...videos];
  //       this.setVideos(this.videos);
  //     });
  //   }
  // }

  override updateVideos(arr: VideoInfo[]): void {
    this.videos = [...this.videos, ...arr];
    this.setVideos(this.videos);
  }

  override scaleWideOrigin(index: number): string {
    switch (index) {
      case 0:
        return "0% 50%";

      case this.sliderReactive.cardsPerPage - 1:
        return "100% 50%";

      default:
        return "50% 50%";
    }
  }

  override translatePosterCards(index: number): string {
    switch (index) {
      case this.sliderReactive.cardsPerPage - 2:
        return "left";
      case this.sliderReactive.cardsPerPage - 1:
        return "left";
      default:
        return "right";
    }
  }
}

export default SliderEntryController;

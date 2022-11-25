import VideoInfo from "../../../interface/VideoInterface";
import SliderController from "./SliderController";

export class SliderEntryController extends SliderController {
  override translatePage(incrementator: number): void {
    super.translatePage(incrementator);
    const translateLength = `translateX(${
      incrementator *
      -(this.sliderReactive.current.cardWidth * this.cardToSlide)
    }%)`;
    this.sliderParams.handleTranslation(translateLength);

    this.fetchVideo(
      this.sliderParams.cardIncrementRef.current,
      this.sliderReactive.current.cardsPerPage
    ).then((data) => {
      this.updateVideos(data.content);
      this.handleTranslateDurationContentPosition(incrementator);
    });
  }

  override resetContentPosition(incrementator: number): void {
    super.resetContentPosition(incrementator);

    this.sliderParams.handleVideos((currentVideos: VideoInfo[]) => {
      return this.setVideosRender(currentVideos);
    });

    this.sliderParams.handleSliderController(
      this.sliderParams,
      this.sliderReactive,
      this.designContext
    );
  }

  // override handleResize(): void {
  //   super.handleResize();
  //   if (
  //     this.sliderReactive.current.prevCardsPerPage !== this.sliderReactive.current.cardsPerPage
  //   ) {
  //     this.videos = this.videos.slice(0, this.sliderReactive.current.cardsPerPage * 2);
  //     this.setVideos(this.videos);

  //     this.cardIncremontator =
  //       this.cardIncremontator +
  //       this.sliderReactive.current.cardsPerPage -
  //       this.sliderReactive.current.prevCardsPerPage;
  //     this.setCardIncremontator(this.cardIncremontator);
  //   }

  //   if (
  //     this.sliderReactive.current.prevCardsPerPage < this.sliderReactive.current.cardsPerPage
  //   ) {
  //     const nbCards =
  //       2 *
  //       (this.sliderReactive.current.cardsPerPage -
  //         this.sliderReactive.current.prevCardsPerPage);

  //     this.fetchVideo(
  //       this.offsetRequestData(this.sliderReactive.current.prevCardsPerPage * 2, 1),
  //       nbCards
  //     ).then((videos) => {
  //       console.log(videos);
  //       this.videos = [...this.videos, ...videos];
  //       this.setVideos(this.videos);
  //     });
  //   }
  // }

  override updateVideos(arr: VideoInfo[]): void {
    this.sliderParams.handleVideos((currentVideos: VideoInfo[]) => {
      return [...currentVideos, ...arr];
    });
  }

  override scaleWideOrigin(index: number): string {
    switch (index) {
      case 0:
        return "0% 50%";

      case this.sliderReactive.current.cardsPerPage - 1:
        return "100% 50%";

      default:
        return "50% 50%";
    }
  }

  override translatePosterCards(index: number): string {
    switch (index) {
      case this.sliderReactive.current.cardsPerPage - 2:
        return "left";
      case this.sliderReactive.current.cardsPerPage - 1:
        return "left";
      default:
        return "right";
    }
  }
}

export default SliderEntryController;

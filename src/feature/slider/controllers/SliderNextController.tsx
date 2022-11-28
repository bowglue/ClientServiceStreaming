import VideoInfo from "../../../interface/VideoInterface";
import SliderController from "./SliderController";

export class SliderNextController extends SliderController {
  videosNext!: VideoInfo[];
  override translatePage(incrementator: number): void {
    super.translatePage(incrementator);
    const translate = `translateX(${
      -1 *
        incrementator *
        (this.sliderReactive.current.cardWidth * this.cardToSlide) -
      (100 + this.sliderReactive.current.cardWidth)
    }%)`;

    this.sliderParams.handleTranslation(translate);

    this.fetchVideo(
      this.offsetRequestData(
        this.sliderParams.cardIncrementRef.current,
        incrementator
      ),
      this.numberRequestData(incrementator)
    ).then((data) => {
      // this.videosNext = data.content;
      // console.log({ Requested: videos });
      this.updateVideos(data.content, incrementator);
      this.handleTranslateDurationContentPosition(incrementator);
    });
  }

  override resetContentPosition(incrementator: number): void {
    super.resetContentPosition(incrementator);
    this.sliderParams.handleVideos((currentVideos: VideoInfo[]) => {
      const videoRotate = this.rotateArray(
        currentVideos.slice(1, -1),
        incrementator * this.cardToSlide
      );
      return this.setVideosRender(
        videoRotate.slice(0, this.sliderReactive.current.cardsPerPage * 3)
      );
    });
  }

  // override handleResize(): void {
  //   super.handleResize();

  //   if (
  //     this.sliderReactive.current.prevCardsPerPage !== this.sliderReactive.current.cardsPerPage
  //   ) {
  //     const nbCards =
  //       this.sliderReactive.current.prevCardsPerPage - this.sliderReactive.current.cardsPerPage;
  //     this.updateCardIncrementatorOnResize();
  //     this.updateTranslationOnResize();

  //     if (
  //       this.sliderReactive.current.prevCardsPerPage < this.sliderReactive.current.cardsPerPage
  //     ) {
  //       this.fetchVideo(
  //         this.offsetRequestData(
  //           this.cardIncremontator - 2 * this.sliderReactive.current.cardsPerPage,
  //           1
  //         ),
  //         Math.abs(nbCards)
  //       ).then((videosBefore) => {
  //         this.fetchVideo(
  //           this.offsetRequestData(this.cardIncremontator + 2, 1),
  //           2 * Math.abs(nbCards)
  //         ).then((videosAfter) => {
  //           console.log(videosBefore);
  //           console.log(videosAfter);

  //           this.videos = [
  //             ...videosBefore,
  //             ...this.videos.slice(1, -1),
  //             ...videosAfter,
  //           ];
  //           this.setVideosRender(this.videos);
  //         });
  //       });
  //       return;
  //     }
  //     this.videos = this.videos
  //       .slice(1, -1)
  //       .slice(nbCards, this.sliderReactive.current.cardsPerPage * 3 + nbCards);
  //     this.setVideosRender(this.videos);
  //     //this.rotateSliderOnResize(this.videos.slice(1, -1), nbCards);
  //   }
  // }

  override updateVideos(nextVideos: VideoInfo[], incrementator: number): void {
    this.sliderParams.handleVideos((currentVideos: VideoInfo[]) => {
      if (this.cardToSlide === this.sliderReactive.current.cardsPerPage) {
        const appendVideos = [...currentVideos.slice(1, -1), ...nextVideos];
        return this.setVideosRender(appendVideos);
      }
      const cardsDifference =
        (currentVideos.length + nextVideos.length) %
        (this.sliderReactive.current.cardsPerPage * 4);

      if (incrementator > 0) {
        return this.updateVideosRightEdge(
          currentVideos,
          cardsDifference,
          nextVideos
        );
      }

      return this.updateVideosLefttEdge(
        currentVideos,
        cardsDifference,
        nextVideos
      );
    });
  }

  updateVideosRightEdge(
    currentVideos: VideoInfo[],
    cardsDifference: number,
    nextVideos: VideoInfo[]
  ): VideoInfo[] {
    const appendVideos = [
      ...currentVideos.slice(1, currentVideos.length - cardsDifference - 1),
      ...nextVideos,
    ];
    return this.setVideosRender(appendVideos);
  }

  updateVideosLefttEdge(
    currentVideos: VideoInfo[],
    cardsDifference: number,
    nextVideos: VideoInfo[]
  ): VideoInfo[] {
    const appendVideos = [
      ...nextVideos.slice(
        this.sliderReactive.current.cardsPerPage - cardsDifference,
        this.sliderReactive.current.cardsPerPage
      ),
      ...currentVideos.slice(cardsDifference + 1, -1),
      ...nextVideos.slice(
        0,
        this.sliderReactive.current.cardsPerPage - cardsDifference
      ),
    ];
    return this.setVideosRender(appendVideos);
  }

  // rotateSliderOnResize(videos: VideoInfo[], nbCards: number): void {
  //   this.videos = this.rotateArray(videos, nbCards).slice(
  //     0,
  //     this.sliderReactive.current.cardsPerPage * 3
  //   );

  //   this.updateTranslationOnResize();
  //   this.setVideosRender(this.videos);
  // }

  // updateTranslationOnResize(): void {
  //   switch (this.sliderReactive.current.cardsPerPage) {
  //     case 2:
  //       this.setTranslation(`translateX(${-150}%)`);
  //       break;
  //     case 4:
  //       this.setTranslation(`translateX(${-125}%)`);
  //       break;
  //     case 6:
  //       this.setTranslation(`translateX(${-116.667}%)`);
  //       break;
  //   }
  // }

  updateCardIncrementatorOnResize(): void {
    if (
      this.sliderReactive.current.prevCardsPerPage >
      this.sliderReactive.current.cardsPerPage
    ) {
      this.sliderParams.cardIncrementRef.current =
        this.sliderParams.cardIncrementRef.current -
        (this.sliderReactive.current.prevCardsPerPage -
          this.sliderReactive.current.cardsPerPage);
    }

    if (
      this.sliderReactive.current.prevCardsPerPage <
      this.sliderReactive.current.cardsPerPage
    ) {
      this.sliderParams.cardIncrementRef.current =
        this.sliderParams.cardIncrementRef.current +
        (this.sliderReactive.current.cardsPerPage -
          this.sliderReactive.current.prevCardsPerPage);
    }
    console.log(
      "CardIncrementator: " + this.sliderParams.cardIncrementRef.current
    );
  }

  override scaleWideOrigin(index: number): string {
    switch (index) {
      case this.sliderReactive.current.cardsPerPage + 1:
        return "0% 50%";
      case 2 * this.sliderReactive.current.cardsPerPage:
        return "100% 50%";
      default:
        return "50% 50%";
    }
  }

  override translatePosterCards(): number {
    return this.sliderReactive.current.cardsPerPage * 2;
  }
}

export default SliderNextController;

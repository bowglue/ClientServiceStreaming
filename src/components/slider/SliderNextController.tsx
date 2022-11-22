import VideoInfo from "../../interface/VideoInterface";
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
    ).then((videos) => {
      this.videosNext = videos;
      // console.log({ Requested: videos });
      this.updateVideos(videos, incrementator);
    });
    setTimeout(() => {
      this.resetContentPosition(incrementator);
    }, 700);
  }

  override resetContentPosition(incrementator: number): void {
    super.resetContentPosition(incrementator);
    this.sliderParams.handleVideos((currentVideos: VideoInfo[]) => {
      const videoRotate = this.rotateArray(
        currentVideos.slice(1, -1),
        incrementator * this.cardToSlide
      );
      // console.log({
      //   final: videoRotate.slice(0, this.sliderReactive.current.cardsPerPage * 3),
      // });
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

  override updateVideos(arr: VideoInfo[], incrementator: number): void {
    this.sliderParams.handleVideos((currentVideos: VideoInfo[]) => {
      if (this.cardToSlide === this.sliderReactive.current.cardsPerPage) {
        const appendVideos = [...currentVideos.slice(1, -1), ...arr];
        // console.log({ Merged: appendVideos });
        return this.setVideosRender(appendVideos);
      }

      const modulo =
        (currentVideos.length + arr.length) %
        (this.sliderReactive.current.cardsPerPage * 4);

      if (incrementator > 0) {
        const appendVideos = [
          ...currentVideos.slice(1, currentVideos.length - modulo - 1),
          ...arr,
        ];
        // console.log({ Merged: appendVideos });
        return this.setVideosRender(appendVideos);
      }

      const appendVideos = [
        ...arr.slice(
          this.sliderReactive.current.cardsPerPage - modulo,
          this.sliderReactive.current.cardsPerPage
        ),
        ...currentVideos.slice(modulo + 1, -1),
        ...arr.slice(0, this.sliderReactive.current.cardsPerPage - modulo),
      ];

      // console.log({ Merged: appendVideos });
      return this.setVideosRender(appendVideos);
    });
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

  override translatePosterCards(index: number): string {
    switch (index) {
      case 2 * this.sliderReactive.current.cardsPerPage - 1:
        return "left";
      case 2 * this.sliderReactive.current.cardsPerPage:
        return "left";
      default:
        return "right";
    }
  }
}

export default SliderNextController;

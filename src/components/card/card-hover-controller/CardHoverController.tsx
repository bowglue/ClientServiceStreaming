export abstract class CardHoverController {
  timerRef!: ReturnType<typeof setTimeout>;
  delay!: number;

  handleMouseEnter(
    handleCardActive: Function,
    translatePosterCards: number,
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined,
    index?: number | undefined
  ): void {
    clearTimeout(this.timerRef);
    this.timerRef = setTimeout(() => {
      this.mouseEnterImplementation(
        translatePosterCards,
        cardRef,
        sliderRef,
        index
      );
      handleCardActive(true);
    }, this.delay);
  }
  handleMouseLeave(
    handleCardActive: Function,
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined
  ): void {
    clearTimeout(this.timerRef);
    handleCardActive(false);
    this.timerRef = setTimeout(() => {
      this.mouseLeaveImplementation(cardRef, sliderRef);
    }, this.delay);
  }

  mouseEnterImplementation(
    translatePosterCards: number,
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined,
    index?: number | undefined
  ): void {}
  mouseLeaveImplementation(
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined
  ): void {}
}

export default CardHoverController;

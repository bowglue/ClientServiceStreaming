export abstract class CardHoverController {
  timerRef!: ReturnType<typeof setTimeout>;
  delay!: number;

  handleMouseEnter(
    handleCardActive: Function,
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined,
    index?: number | undefined
  ): void {
    clearTimeout(this.timerRef);
    this.timerRef = setTimeout(() => {
      this.mouseEnterImplementation(cardRef, sliderRef, index);
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

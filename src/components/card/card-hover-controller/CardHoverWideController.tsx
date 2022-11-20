import CardHoverController from "./CardHoverController";

export class CardHoverWideController extends CardHoverController {
  constructor(delay: number) {
    super();
    this.delay = delay;
  }
  override mouseEnterImplementation(
    translatePosterCards: string,
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined,
    index?: number | undefined
  ): void {
    this.handleZIndex("10", cardRef!);
  }

  override mouseLeaveImplementation(
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined,
    index?: number | undefined
  ): void {
    this.handleZIndex("0", cardRef!);
  }

  handleZIndex = (zIndex: string, cardRef: HTMLDivElement) => {
    cardRef.style.zIndex = zIndex;
  };
}

export default CardHoverWideController;

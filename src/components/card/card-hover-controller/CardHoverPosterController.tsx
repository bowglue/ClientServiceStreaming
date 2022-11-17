import CardHoverController from "./CardHoverController";

export class CardHoverPosterController extends CardHoverController {
  constructor(delay: number) {
    super();
    this.delay = delay;
  }

  override mouseEnterImplementation(
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined,
    index?: number | undefined
  ): void {
    if (index !== 11 && index !== 12) {
      Array.from(sliderRef!.children)
        .filter(
          (cardFiltered, indexChild) => indexChild > index! && cardFiltered
        )
        .map((card) => {
          return ((card.children[0] as HTMLElement).style.transform =
            "translateX(calc(200% + 4*0.2vw))");
        });
      return;
    }

    if (index === 11 || index === 12) {
      Array.from(sliderRef!.children)
        .filter(
          (cardFiltered, indexChild) =>
            indexChild <= index && (cardFiltered as HTMLElement)
        )
        .map((card) => {
          return ((card.children[0] as HTMLElement).style.transform =
            "translateX(calc(-200% - 4*0.2vw))");
        });
      return;
    }
  }

  override handleMouseLeave(
    handleCardActive: Function,
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined
  ): void {
    handleCardActive(false);
    clearTimeout(this.timerRef);
    Array.from(sliderRef!.children).map((card: Element) => {
      return ((card.children[0] as HTMLElement).style.transform = "");
    });
  }
}

export default CardHoverPosterController;

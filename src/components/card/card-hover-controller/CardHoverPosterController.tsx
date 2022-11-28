import CardHoverController from "./CardHoverController";

export class CardHoverPosterController extends CardHoverController {
  constructor(delay: number) {
    super();
    this.delay = delay;
  }

  override mouseEnterImplementation(
    translatePosterCards: number,
    cardRef?: HTMLDivElement | undefined,
    sliderRef?: HTMLDivElement | undefined,
    index?: number | undefined
  ): void {
    const slideRight =
      index! + 2 <= translatePosterCards ? 2 : translatePosterCards - index!;
    const slideLeft = slideRight === 2 ? 0 : index! + 2 - translatePosterCards;

    if (slideLeft === 0) {
      Array.from(sliderRef!.children)
        .filter((cardFilter, indexFilter) => indexFilter > index! && cardFilter)
        .map((card) => {
          const translate = `translateX(calc(${slideRight * 100}% + ${
            slideRight * 2 * 0.2
          }vw))`;

          return ((card.children[0] as HTMLElement).style.transform =
            translate);
        });
      return;
    }

    if (slideRight === 0) {
      Array.from(sliderRef!.children)
        .filter(
          (cardFilter, indexFilter) => indexFilter <= index! && cardFilter
        )
        .map((card) => {
          const translate = `translateX(calc(${-slideLeft * 100}% + ${
            -slideLeft * 2 * 0.2
          }vw))`;

          return ((card.children[0] as HTMLElement).style.transform =
            translate);
        });
      return;
    }

    Array.from(sliderRef!.children).map((card, indexChild) => {
      const slideCards = indexChild > index! ? slideRight : -slideLeft;
      const translate = `translateX(calc(${slideCards * 100}% + ${
        slideCards * 2 * 0.2
      }vw))`;
      return ((card.children[0] as HTMLElement).style.transform = translate);
    });
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

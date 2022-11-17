import { useEffect, useState } from "react";
import SliderController from "./SliderController";
import SliderEntryController from "./SliderEntryController";

const useSliderReactive = (sliderController: SliderController) => {
  const [cardsPerPage, setCardsPerPage] = useState<number>();
  const [sliderPadding, setSliderPadding] = useState<string>("");
  const [itemPadding, setItemPadding] = useState<string>("");
  const [buttonWidth, setButtonWidth] = useState<string>("");
  const [cardWidth, setCardWidth] = useState<number>();
  const [translateLength, setTranslateLength] = useState<number>();
  const [prevCardsPerPage, setPrevCardsPerPage] = useState<number>();

  const sliderReactive = {
    cardsPerPage,
    sliderPadding,
    itemPadding,
    buttonWidth,
    cardWidth,
    translateLength,
    prevCardsPerPage,
    setCardsPerPage,
    setSliderPadding,
    setItemPadding,
    setButtonWidth,
    setCardWidth,
    setTranslateLength,
    setPrevCardsPerPage,
  };

  useEffect(() => {
    if (sliderController instanceof SliderEntryController)
      sliderController.handleResize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderController]);

  const resize = () => {
    sliderController.handleResize();
  };

  return sliderReactive;
};

export default useSliderReactive;

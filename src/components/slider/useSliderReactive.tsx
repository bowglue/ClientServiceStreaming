import { useEffect, useState } from "react";
import SliderController from "./SliderController";

const useSliderReactive = (sliderController: SliderController) => {
  const [cardsPerPage, setCardsPerPage] = useState<number>(6);
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
  };

  useEffect(() => {
    windowResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderController]);

  const windowResize = () => {
    if (window.innerWidth <= 1400) {
      setCardsPerPage(3);
      setSliderPadding("0 3.5vw");
      setItemPadding("0 0.3vw");
      setButtonWidth(`${3.5 - 0.3}vw`);
      setCardWidth(100 / 3);
      setTranslateLength(-(100 + 100 / 3));
    } else {
      setCardsPerPage(6);
      setSliderPadding("0 2.5vw");
      setItemPadding("0 0.2vw");
      setButtonWidth(`${2.5 - 0.2}vw`);
      setCardWidth(100 / 6);
      setTranslateLength(-(100 + 100 / 6));
    }

    setPrevCardsPerPage(cardsPerPage);
  };

  return sliderReactive;
};

export default useSliderReactive;

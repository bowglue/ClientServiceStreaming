import { useEffect, useState } from "react";

interface SliderReactive {
  cardsPerPage: number;
  sliderPadding: string;
  itemPadding: string;
  buttonWidth: string;
  cardWidth: number;
  translateLength: number;
  prevCardsPerPage: number;
}

const useSliderReactive = () => {
  const [sliderReactive, setSliderReactive] = useState<SliderReactive>({
    cardsPerPage: 6,
    sliderPadding: "",
    itemPadding: "",
    buttonWidth: "",
    cardWidth: 0,
    translateLength: 0,
    prevCardsPerPage: 0,
  });

  useEffect(() => {
    windowResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  const windowResize = () => {
    if (window.innerWidth <= 1400) {
      setSliderReactive({
        cardsPerPage: 3,
        sliderPadding: "0 3.5vw",
        itemPadding: "0 0.3vw",
        buttonWidth: `${3.5 - 0.3}vw`,
        cardWidth: 100 / 3,
        translateLength: -(100 + 100 / 3),
        prevCardsPerPage: sliderReactive.cardsPerPage,
      });
    } else {
      setSliderReactive({
        cardsPerPage: 6,
        sliderPadding: "0 2.5vw",
        itemPadding: "0 0.2vw",
        buttonWidth: `${2.5 - 0.2}vw`,
        cardWidth: 100 / 6,
        translateLength: -(100 + 100 / 6),
        prevCardsPerPage: sliderReactive.cardsPerPage,
      });
    }
  };

  return sliderReactive;
};

export default useSliderReactive;

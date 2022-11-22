import { useEffect, useRef, useState } from "react";
import {
  SliderReactiveCssInterface,
  SliderReactiveInfoInterface,
} from "../../interface/SliderReactiveInterface";

const useSliderReactive = () => {
  const [sliderReactiveCss, setSliderReactive] =
    useState<SliderReactiveCssInterface>({
      sliderPadding: "",
      itemPadding: "",
      buttonWidth: "",
      cardWidth: "",
    });

  const sliderReactiveInfoRef = useRef<SliderReactiveInfoInterface>({
    cardsPerPage: 0,
    cardWidth: 0,
    translateLength: 0,
    prevCardsPerPage: 0,
  });

  useEffect(() => {
    windowResize();
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  const windowResize = () => {
    if (window.innerWidth <= 1400) {
      sliderReactiveInfoRef.current = {
        cardsPerPage: 4,
        cardWidth: 100 / 4,
        translateLength: -(100 + 100 / 4),
        prevCardsPerPage: sliderReactiveInfoRef.current.cardsPerPage,
      };

      setSliderReactive({
        sliderPadding: "0 3.5vw",
        itemPadding: "0 0.3vw",
        buttonWidth: `${3.5 - 0.3}vw`,
        cardWidth: `${sliderReactiveInfoRef.current.cardWidth}%`,
      });
    } else {
      sliderReactiveInfoRef.current = {
        cardsPerPage: 6,
        cardWidth: 100 / 6,
        translateLength: -(100 + 100 / 6),
        prevCardsPerPage: sliderReactiveInfoRef.current.cardsPerPage,
      };

      setSliderReactive({
        sliderPadding: "0 2.5vw",
        itemPadding: "0 0.2vw",
        buttonWidth: `${2.5 - 0.2}vw`,
        cardWidth: `${sliderReactiveInfoRef.current.cardWidth}%`,
      });
    }
  };

  return {
    sliderReactiveCss: sliderReactiveCss,
    sliderReactiveInfoRef: sliderReactiveInfoRef,
  };
};

export default useSliderReactive;

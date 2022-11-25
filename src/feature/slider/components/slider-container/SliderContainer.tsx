import React from "react";
import SliderHeader from "../slider-header/SliderHeader";
import Slider from "../slider-main/SliderMain";

import "./SliderContainer.css";

const SliderContainer = () => {
  return (
    <div className="slider-container">
      <SliderHeader />
      <Slider />
    </div>
  );
};

export default SliderContainer;

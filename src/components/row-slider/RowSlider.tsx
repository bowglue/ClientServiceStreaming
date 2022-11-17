import React from "react";
import SliderHeader from "../header/slider-header/SliderHeader";
import Slider from "../slider/Slider";

import "./RowSlider.css";

const RowSlider = () => {
  return (
    <div className="row-container">
      <SliderHeader />
      <Slider />
    </div>
  );
};

export default RowSlider;

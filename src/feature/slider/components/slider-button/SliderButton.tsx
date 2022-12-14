import React from "react";
import PropTypes from "prop-types";
import LeftSliderButton from "../../../../assets/slider-button/left_slider_button.png";
import RightSliderButton from "../../../../assets/slider-button/right_slider_button.png";
import "./SliderButton.css";

interface SliderButtonPropTypes {
  buttonWidth: string;
  isVisible: boolean;
  onChangePage: Function;
}

const SliderButton = ({
  buttonWidth,
  isVisible,
  onChangePage,
}: SliderButtonPropTypes) => {
  return (
    <>
      <span
        className="slider-button-mask left-mask"
        style={{ width: buttonWidth }}
      >
        {isVisible && (
          <span
            className="slider-button left"
            onClick={() => {
              onChangePage(-1);
            }}
          >
            <img src={LeftSliderButton} alt="Right button" />
          </span>
        )}
      </span>
      <span
        className="slider-button-mask right-mask"
        style={{ width: buttonWidth }}
      >
        <span
          className="slider-button right"
          onClick={() => {
            onChangePage(1);
          }}
        >
          <img src={RightSliderButton} alt="Right button" />
        </span>
      </span>
    </>
  );
};

SliderButton.propTypes = {
  buttonWidth: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default SliderButton;

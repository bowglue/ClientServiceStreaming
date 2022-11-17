import React from "react";
import PropTypes from "prop-types";
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
            <img src="/icon/left_slider_button.png" alt="Right button" />
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
          <img src="/icon/right_slider_button.png" alt="Right button" />
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

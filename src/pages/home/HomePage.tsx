import React from "react";
import RowSlider from "../../components/row-slider/RowSlider";
import { POSTERCONTEXT } from "../../context/DesignContext";
import { DesignContext } from "../../context/SliderContext";

const HomePage = () => {
  return (
    <>
      <RowSlider />
      <DesignContext.Provider value={POSTERCONTEXT}>
        <RowSlider />
      </DesignContext.Provider>
      <RowSlider />
    </>
  );
};

export default HomePage;

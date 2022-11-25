import { POSTERCONTEXT } from "../../context/DesignContext";
import { DesignContext } from "../../context/SliderContext";
import SliderContainer from "../../feature/slider/components/slider-container/SliderContainer";

const HomePage = () => {
  return (
    <>
      <SliderContainer />
      <DesignContext.Provider value={POSTERCONTEXT}>
        <SliderContainer />
      </DesignContext.Provider>
      <SliderContainer />
    </>
  );
};

export default HomePage;

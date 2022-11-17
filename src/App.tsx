import "./App.css";
import Layout from "./components/layout/Layout";
import Slider from "./components/slider/Slider";
import { POSTERCONTEXT } from "./context/DesignContext";
import { DesignContext } from "./context/SliderContext";

function App() {
  return (
    <>
      <Layout>
        <Slider />
        <DesignContext.Provider value={POSTERCONTEXT}>
          <Slider />
        </DesignContext.Provider>
        <Slider />
      </Layout>
    </>
  );
}

export default App;

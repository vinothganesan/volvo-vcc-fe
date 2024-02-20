import { useContext } from "react";
import { View } from "vcc-ui";
import { SliderProvider } from "./context";
import { NavButtons, Pills } from "./nav";
import CarsComponent from "./cars";
import Filter from "./filter";
import { AppContext } from "../../context/app";

const Slider: React.FC = () => {
  const { cars } = useContext(AppContext);
  return (
    <SliderProvider cars={cars}>
      <View
        extend={{
          width: "100vw",
        }}
      >
        <Filter />
        <CarsComponent />
        <Pills />
        <NavButtons />
      </View>
    </SliderProvider>
  );
};

export default Slider;

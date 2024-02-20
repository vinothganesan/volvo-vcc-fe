import { useEffect } from "react";
import useSliderContext from "./useSliderContext";
import useScrollIntoView from "../../hooks/useScrollIntoView";
import Car from "./car";
import { View } from "vcc-ui";

const Cars: React.FC = () => {
  const {
    data: { cars },
  } = useSliderContext();
  const { scrollTo } = useScrollIntoView();

  useEffect(() => {
    if (window.location.hash) {
      scrollTo(window.location.hash);
    }
  }, [scrollTo]);

  return (
    <View
      className="slides"
      padding={2}
      extend={{
        overflowX: "auto",
        flexDirection: "row",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        scrollSnapAlign: "start",
      }}
    >
      {cars
        ?.filter((car) => !car.hide)
        .map((car) => (
          <Car key={car.id} car={car} />
        ))}
    </View>
  );
};

export default Cars;

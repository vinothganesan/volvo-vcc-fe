import { useEffect, useMemo } from "react";
import Image from "next/image";
import { useTheme, View, Text, Link, Flex, Block, Spacer } from "vcc-ui";
import { useInView } from "react-hook-inview";
import useSliderContext from "./useSliderContext";
import { CarProps } from "../../types/types";

const CarContainer: React.FC<CarProps> = ({ car }) => {
  const [ref, inView] = useInView({ threshold: 0.75 });
  const {
    states: { addIdInView, removeIdFromView },
  } = useSliderContext();

  const theme = useTheme();

  const carId = useMemo(() => car.id, [car]);

  useEffect(() => {
    if (inView) {
      addIdInView(carId);
    } else {
      removeIdFromView(carId);
    }
    return () => removeIdFromView(carId);
  }, [inView, carId, addIdInView, removeIdFromView]);

  return (
    <View
      ref={ref}
      id={car.id}
      extend={{
        width: "300px",
        marginRight: "8px",
        ":last-of-type": {
          marginRight: "0px",
        },
      }}
    >
      <Text
        variant="bates"
        subStyle="emphasis"
        foreground={theme.color.foreground.secondary}
      >
        {car.bodyType.toLocaleUpperCase()}
      </Text>
      <View
        extend={{
          flexDirection: "column",
          fromL: {
            flexDirection: "row",
          },
        }}
      >
        <Text
          variant="columbus"
          subStyle="emphasis"
          extend={{ paddingRight: "5px" }}
        >
          {car.modelName}
        </Text>
        <Text variant="columbus" foreground={theme.color.foreground.secondary}>
          {car.modelType}
        </Text>
      </View>
      <Spacer size={{ default: 1 }} />
      <Image
        className="car-image"
        src={car.imageUrl}
        alt={car.modelName}
        width="320px"
        height="240px"
      />
      <Flex extend={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Block extend={{ textAlign: "center" }}>
          <Link href={`/learn/${car.id}`} arrow="right">
            Learn
          </Link>
          <Spacer />
        </Block>
        <Block extend={{ textAlign: "center" }}>
          <Link href={`/shop/${car.id}`} arrow="right">
            Shop
          </Link>
        </Block>
      </Flex>
    </View>
  );
};

export default CarContainer;

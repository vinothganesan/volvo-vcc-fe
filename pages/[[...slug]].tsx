import { StrictMode, useContext } from "react";
import {
  styleRenderer,
  StyleProvider,
  ThemePicker,
  View,
  Logo,
  Spacer,
} from "vcc-ui";

import AppProvider, { AppContext } from "../src/context/app";
import Slider from "../src/components/slider";
import URLS from "../src/URLS.json";

export async function getStaticPaths() {
  const response = await fetch(URLS.CARS);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const cars = await response.json();
  const paths = [
    {
      params: { slug: [] },
    },
    ...cars.map((car: any) => `/#${car.id}`),
  ];
  return { paths, fallback: false };
}

export async function getStaticProps() {
  try {
    const response = await fetch(URLS.CARS);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const cars = await response.json();
    return {
      props: {
        cars,
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }
}

const Themed = () => {
  const { choosenTheme } = useContext(AppContext);
  return (
    <ThemePicker variant={choosenTheme}>
      <View
        extend={({ theme }) => ({
          background: theme.color.background.primary,
          height: "auto",
          minHeight: "100vh",
          width: "100vw",
          justifyContent: "center",
        })}
      >
        <Spacer size={6} />
        <Logo type="spreadmark" height={12} />
        <Spacer size={6} />
        <Slider />
        <Spacer size={6} />
      </View>
    </ThemePicker>
  );
};

const App = ({ cars }: { cars: any }) => {
  const renderer = styleRenderer();
  renderer.renderStatic(
    {
      margin: 0,
      padding: 0,
    },
    "body"
  );
  renderer.renderStatic({ transition: "transform 0.2s" }, "img.car-image");
  renderer.renderStatic({ transform: "scale(1.1)" }, " img.car-image:hover");
  renderer.renderStatic({ display: "none" }, "::-webkit-scrollbar");

  return (
    <StrictMode>
      <StyleProvider renderer={renderer}>
        <AppProvider cars={cars}>
          <Themed />
        </AppProvider>
      </StyleProvider>
    </StrictMode>
  );
};

export default App;

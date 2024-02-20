import { useState, createContext } from "react";
import { AppContextInterface } from "../types/types";

export const AppContext: React.Context<AppContextInterface> =
  createContext<AppContextInterface>({
    toggle: () => {},
    mode: false,
    choosenTheme: "light",
    cars: [],
  });

const AppProvider: ({ cars, children }: any) => JSX.Element = ({
  cars,
  children,
}) => {
  const [mode, setMode] = useState(false);
  const choosenTheme = mode ? "dark" : "light";
  const toggle = () => setMode((old) => !old);

  return (
    <AppContext.Provider value={{ cars, mode, toggle, choosenTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

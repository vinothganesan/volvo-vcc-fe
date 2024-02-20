import { createContext, useReducer, useCallback } from "react";
import sliderReducer from "./reducer";
import {
  Filters,
  SliderContextInterface,
  SliderActions,
  Dispatcher,
  Car,
} from "../../types/types";

const SliderContext = createContext<SliderContextInterface>([
  { activeId: "", idsInView: [], cars: [], activeFilter: Filters.all },
  () => {},
]);

const SliderProvider = (props: any) => {
  const { children, cars } = props;
  const [state, _dispatch] = useReducer(sliderReducer, {
    activeId: "",
    idsInView: [],
    cars,
    activeFilter: Filters.all,
  });

  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as SliderActions);
  }, []);

  return (
    <SliderContext.Provider value={[state, dispatch]}>
      {children}
    </SliderContext.Provider>
  );
};

export { SliderContext, SliderProvider };

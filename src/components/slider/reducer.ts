import { SliderActions, SliderState, Filters } from "../../types/types";

const sliderReducer = (
  state: SliderState,
  action: SliderActions
): SliderState => {
  switch (action.type) {
    case "activeFilter":
      return {
        ...state,
        activeFilter: action.payload,
      };
    case "clearFilters":
      return {
        ...state,
        cars: state.cars.map(({ hide, ...car }) => car),
        activeFilter: Filters.all,
      };
    case "setActiveId":
      return {
        ...state,
        activeId: action.payload,
      };
    case "addCars": {
      return {
        ...state,
        cars: action.payload,
      };
    }
    case "addIdInView":
      return {
        ...state,
        idsInView: [...state.idsInView, action.payload].sort(
          (a, b) => a.position - b.position
        ),
        activeId: action.payload.id,
      };
    case "removeIdFromView":
      return {
        ...state,
        idsInView: [
          ...state.idsInView.filter(({ id }) => id !== action.payload),
        ],
      };
  }
};

export default sliderReducer;

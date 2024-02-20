import { useContext, useEffect, useCallback, useMemo } from "react";
import { SliderContext } from "./context";
import useDebounce from "../../hooks/useDebounce";
import useScrollIntoView from "../../hooks/useScrollIntoView";
import { Car, Filters, IdInView, MaxAndMin } from "../../types/types";

const useSliderContext = () => {
  const [{ activeId, cars, idsInView, activeFilter }, dispatch] =
    useContext(SliderContext);

  const { maxPosition, minPosition }: MaxAndMin = idsInView.reduce(
    (prev: MaxAndMin, curr: IdInView) => ({
      maxPosition:
        curr.position > prev.maxPosition ? curr.position : prev.maxPosition,
      minPosition:
        curr.position < prev.minPosition ? curr.position : prev.minPosition,
    }),
    {
      maxPosition: -1,
      minPosition: Infinity,
    }
  );

  const debouncedActiveId: string = useDebounce<string>(activeId, 500);

  useEffect(() => {
    if (debouncedActiveId) {
      const hash = `#${debouncedActiveId}`;
      if (window.location.hash !== hash) {
        history.replaceState(null, "", hash);
      }
    }
  }, [debouncedActiveId]);

  const addIdInView = useCallback(
    (id: string) =>
      dispatch("addIdInView", {
        id,
        position: cars.findIndex((car: Car) => car.id === id),
      }),
    [dispatch, cars]
  );

  const removeIdFromView = useCallback(
    (id: string) => dispatch("removeIdFromView", id),
    [dispatch]
  );

  const setActiveId = useCallback(
    (id: string) => {
      dispatch("setActiveId", id);
    },
    [dispatch]
  );

  const setCars = useCallback(
    (cars: Car[]) => {
      dispatch("addCars", cars);
    },
    [dispatch]
  );

  const filterCars = (bodyType: Filters) => {
    dispatch("activeFilter", bodyType);
    setCars([
      ...cars.map(({ hide, ...car }: Car) =>
        car.bodyType === bodyType ? car : { ...car, hide: true }
      ),
    ]);
  };

  const clearFilters = () => {
    dispatch("clearFilters");
  };

  const { scrollTo } = useScrollIntoView();

  const goForward = () => {
    const car = cars[maxPosition + 1];
    if (car) {
      scrollTo(`#${car.id}`);
    }
  };
  const goBackward = () => {
    const car = cars[minPosition - 1];
    if (car) {
      scrollTo(`#${car.id}`);
    }
  };

  const filteredCars: Car[] = useMemo(
    () => cars?.filter((car: Car) => !car.hide),
    [cars]
  );

  const forwardDisabled = maxPosition + 1 >= filteredCars?.length;
  const backwardDisabled = minPosition - 1 <= -1;

  const bodyTypes = useMemo(() => {
    const bodyTypesArray = Array.from(
      new Set(cars?.map(({ bodyType }: Car) => bodyType))
    );
    bodyTypesArray.unshift(Filters.all);
    return bodyTypesArray;
  }, [cars]);

  const debouncedShowNavigation: boolean = useDebounce<boolean>(
    filteredCars?.length !== idsInView.length,
    500
  );

  return {
    navigation: {
      goForward,
      goBackward,
      forwardDisabled,
      backwardDisabled,
      showNavigation: debouncedShowNavigation,
    },
    data: {
      bodyTypes,
      cars: filteredCars,
      setCars,
    },
    states: {
      activeId,
      setActiveId,
      addIdInView,
      removeIdFromView,
    },
    filter: {
      activeFilter,
      apply: filterCars,
      clear: clearFilters,
    },
  };
};

export default useSliderContext;

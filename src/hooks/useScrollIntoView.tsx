import { useCallback } from "react";

const useScrollIntoView: () => {
  scrollTo: (element: string) => void;
} = () => {
  const scrollTo = useCallback((element: string) => {
    const el = document.querySelector(element);
    if (el !== null) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return { scrollTo };
};

export default useScrollIntoView;

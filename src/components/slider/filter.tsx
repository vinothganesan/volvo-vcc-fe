import { View, TabNav, TabNavItem, Spacer } from "vcc-ui";
import useSliderContext from "./useSliderContext";
import { Filters } from "../../types/types";

const Filter: React.FC = () => {
  const {
    filter: { apply, clear, activeFilter },
    data: { bodyTypes },
  } = useSliderContext();

  return (
    <View
      extend={{
        maxWidth: "100vw",
      }}
    >
      <TabNav enableLineTransition>
        {bodyTypes.map((bodyType) => (
          <TabNavItem
            key={bodyType}
            isActive={activeFilter === bodyType}
            onClick={() => {
              bodyType === Filters.all ? clear() : apply(bodyType);
            }}
          >
            {bodyType.toLocaleUpperCase()}
          </TabNavItem>
        ))}
      </TabNav>
      <Spacer size={5} />
    </View>
  );
};

export default Filter;

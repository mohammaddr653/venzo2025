import ColorFilterBox from "./colorFilter-box";
import OrdinaryFilterBox from "./ordinaryFilter-box";

const MobFiltersForm = ({
  filters,
  appliedQueries,
  handleFilterCheck,
}: any) => {
  return (
    <div className="">
      {filters.map((item: any, index: any) => {
        return (
          <form className="flex flex-col gap-2 p-4" key={index}>
            <h4 className="font-weight300">{item?.property.name}</h4>
            {item?.property?.type === "color" ? (
              <ColorFilterBox
                item={item}
                appliedQueries={appliedQueries}
                handleFilterCheck={handleFilterCheck}
              ></ColorFilterBox>
            ) : (
              <OrdinaryFilterBox
                item={item}
                appliedQueries={appliedQueries}
                handleFilterCheck={handleFilterCheck}
              ></OrdinaryFilterBox>
            )}
          </form>
        );
      })}
    </div>
  );
};

export default MobFiltersForm;

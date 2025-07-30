import TitleCentral from "./title-central";

interface NonSelectivePropertiesGridProps {
  product: any;
}

const NonSelectivePropertiesGrid = (props: NonSelectivePropertiesGridProps) => {
  return (
    <div className="flex flex-col">
      {props.product?.properties.some((obj: any) => !obj.selective) ? (
        <div className="flex flex-col gap-8">
          <ul className="grid grid-cols-3 gap-2">
            {props.product.properties
              .filter((obj: any) => !obj.selective)
              .slice(0, 4)
              .map((property: any, index: any) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col bg-neutral-200 rounded-md p-2"
                  >
                    <h5 className="text-neutral-500 text-size14">
                      {property.property.name}
                    </h5>
                    <ul className="flex flex-row gap-1">
                      {property.values.map((propertyval: any, index: any) => {
                        if (index > 1) {
                          return <li key={index}>...</li>;
                        }
                        if (index <= 1) {
                          if (
                            index === property.values.length - 1 ||
                            index === 1
                          ) {
                            return (
                              <li
                                key={index}
                                className="flex flex-row gap-0.5 items-center"
                              >
                                <h4>
                                  {propertyval.propertyval
                                    ? propertyval.propertyval.value
                                    : propertyval.valueString}
                                </h4>
                              </li>
                            );
                          } else {
                            return (
                              <li
                                key={index}
                                className="flex flex-row gap-0.5 items-center"
                              >
                                <h4>
                                  {propertyval.propertyval
                                    ? propertyval.propertyval.value
                                    : propertyval.valueString}
                                </h4>
                                <span>,</span>
                              </li>
                            );
                          }
                        }
                      })}
                    </ul>
                  </li>
                );
              })}
          </ul>
          <TitleCentral
            title={"مشاهده همه ویژگی ها"}
            class={
              "text-size15 text-nowrap text-neutral-700 border border-neutral-300 px-4 py-2 rounded-md"
            }
            icon={true}
          ></TitleCentral>
        </div>
      ) : null}
    </div>
  );
};
export default NonSelectivePropertiesGrid;

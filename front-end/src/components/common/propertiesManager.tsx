import { FocusEvent, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import {
  PropertiesObj,
  PropertyvalsObj,
} from "../../types/objects/propertiesObj";

interface PropertiesManagerProps {
  properties: PropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<PropertiesObj[]>>;
  propertiesAndVals: any;
}

interface propertyObj {
  name: string;
  suggestions: string[];
}

interface propertyvalObj {
  value: string;
  suggestions: string[];
}

const PropertiesManager = ({
  properties,
  setProperties,
  propertiesAndVals,
}: PropertiesManagerProps) => {
  const { user } = useUserStore();

  const [property, setProperty] = useState<propertyObj>({
    name: "",
    suggestions: [],
  });

  const [propertyval, setPropertyval] = useState<propertyvalObj>({
    value: "",
    suggestions: [],
  });

  const [selectedProperty, setSelectedProperty] = useState<any>("");

  const handleproperty = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.value) {
      const matches = propertiesAndVals.filter((obj: any) =>
        obj.name.startsWith(e.target.value)
      );
      setProperty({ name: e.target.value, suggestions: matches });
    } else {
      setProperty({ name: "", suggestions: [] });
    }
  };

  useEffect(() => {
    console.log("this is property:", property);
  }, [property]);

  const addProperty = () => {
    console.log("add property");
    let propertyObj: PropertiesObj = {
      name: property.name,
      values: [],
    };
    setProperties((prev) => {
      const exist = prev.find((item) => item.name === property.name);
      if (!exist) {
        return [...prev, propertyObj];
      } else {
        return [...prev];
      }
    });
    setProperty({ name: "", suggestions: [] });
  };

  const handlepropertyval = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.value) {
      const matchedProperty = propertiesAndVals.find(
        (obj: any) => obj.name === selectedProperty
      );
      if (matchedProperty && matchedProperty.values.length) {
        const matches = matchedProperty.values.filter((obj: any) =>
          obj.value.startsWith(e.target.value)
        );
        setPropertyval({ value: e.target.value, suggestions: matches });
      } else {
        setPropertyval({ value: e.target.value, suggestions: [] });
      }
    } else {
      setPropertyval({ value: e.target.value, suggestions: [] });
    }
  };

  useEffect(() => {
    console.log("this is propertyval:", propertyval);
  }, [propertyval]);

  const addPropertyval = async (e: React.FormEvent) => {
    e.preventDefault();

    let propertyvalue: PropertyvalsObj = {
      value: propertyval.value,
    };
    setProperties((prev) => {
      const exist = prev.find((item) => item.name === selectedProperty);
      if (exist) {
        const existingVal = exist.values.find(
          (item) => item.value === propertyval.value
        );
        if (!existingVal) {
          return prev.map((item) =>
            item.name === selectedProperty
              ? { ...item, values: [...item.values, propertyvalue] }
              : item
          );
        } else {
          return [...prev];
        }
      } else {
        return [...prev];
      }
    });
    setPropertyval({ value: "", suggestions: [] });
  };

  const handleClickOut = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log("this is target :", target);
    if (target.className !== selectedProperty && target.className !== "ss") {
      setSelectedProperty("");
      console.log("this is event : ", event.target);
    }
  };

  useEffect(() => {
    console.log("selectedProperty:", typeof selectedProperty);
    setPropertyval({ value: "", suggestions: [] });

    if (selectedProperty) {
      document.addEventListener("click", handleClickOut);
    }
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [selectedProperty]);

  // const addClickOutEvent = (handler: FocusEvent<HTMLInputElement>) => {
  //   const handleClickOut = (event: MouseEvent) => {
  //     if (handler.target !== event.target) {
  //       if (handler.target.name === "property") {
  //         console.log("property suggestion reset");
  //         setPropertiesSuggest([]);
  //       }
  //       if (handler.target.name === "propertyval") {
  //         console.log("property val suggestion reset");
  //         setPropertyvalsSuggest([]);
  //       }
  //       document.removeEventListener("click", handleClickOut);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOut);
  // };

  return (
    <div>
      <h1>مدیریت ویژگی ها</h1>
      <form className="flex-column">
        <div className="bg-green-500">
          <input
            type="text"
            placeholder="ویژگی"
            name="property"
            onFocus={undefined}
            value={property.name}
            className="border"
            onChange={handleproperty}
          />
          {property.suggestions.length ? (
            <ul className="border bg-amber-400">
              {property.suggestions.map((suggest: any, index: any) => {
                return (
                  <li
                    key={index}
                    onClick={() =>
                      setProperty({ name: suggest.name, suggestions: [] })
                    }
                  >
                    {suggest.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <button
            type="button"
            onMouseDown={addProperty}
            disabled={property.name ? false : true}
          >
            افزودن ویژگی
          </button>
        </div>
      </form>
      {properties.length
        ? properties.map((propertyObj: PropertiesObj, index: any) => {
            return (
              <div className="bg-amber-500 p-5" key={index}>
                <h3>{propertyObj.name}</h3>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex-column"
                >
                  <input
                    type="text"
                    placeholder="مقدار ویژگی"
                    name="propertyval"
                    onFocus={(handler) => {
                      // addClickOutEvent(handler);
                      setSelectedProperty(propertyObj.name);
                    }}
                    value={
                      selectedProperty === propertyObj.name
                        ? propertyval.value
                        : ""
                    }
                    className={propertyObj.name}
                    onChange={handlepropertyval}
                    disabled={propertyObj.name ? false : true}
                  />
                  {propertyval.suggestions.length &&
                  selectedProperty === propertyObj.name ? (
                    <ul className="border bg-amber-400">
                      {propertyval.suggestions.map(
                        (suggest: any, index: any) => {
                          return (
                            <li
                              key={index}
                              className="ss"
                              onClick={() => {
                                setPropertyval({
                                  value: suggest.value,
                                  suggestions: [],
                                });
                              }}
                            >
                              {suggest.value}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  ) : null}
                  <button
                    type="submit"
                    onMouseDown={addPropertyval}
                    disabled={
                      propertyObj.name &&
                      propertyval.value &&
                      selectedProperty === propertyObj.name
                        ? false
                        : true
                    }
                  >
                    افزودن مقدار ویژگی
                  </button>
                </form>
                {propertyObj.values.length ? (
                  <ul>
                    {propertyObj.values.map(
                      (propertyvalObj: PropertyvalsObj, index: any) => {
                        return <li key={index}>{propertyvalObj.value}</li>;
                      }
                    )}
                  </ul>
                ) : null}
              </div>
            );
          })
        : null}

      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " product"}
      </div>
    </div>
  );
};
export default PropertiesManager;

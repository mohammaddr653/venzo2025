import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUserStore } from "../../store";
import {
  PropertiesObj,
  PropertyvalsObj,
} from "../../types/objects/propertiesObj";
import callManager from "../../helpers/callManager";
import { SERVER_API } from "../../../config";
import axios from "axios";

interface PropertiesManagerProps {
  properties: PropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<PropertiesObj[]>>;
  propertiesAndVals: any;
  loadPropertiesAndVals: any;
}

enum SelectiveEnums {
  true = "true",
  false = "false",
}
interface propertyObj {
  name: string;
  selective: SelectiveEnums;
  suggestions: string[];
}

interface propertyvalObj {
  value: string;
  price: string | "";
  suggestions: string[];
}

const PropertiesManager = ({
  properties,
  setProperties,
  propertiesAndVals,
  loadPropertiesAndVals,
}: PropertiesManagerProps) => {
  const { user } = useUserStore();
  const { call, loading } = callManager();
  const [property, setProperty] = useState<propertyObj>({
    name: "",
    selective: SelectiveEnums.false,
    suggestions: [],
  });

  const [propertyval, setPropertyval] = useState<propertyvalObj>({
    value: "",
    price: "",
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
      setProperty({ ...property, name: e.target.value, suggestions: matches });
    } else {
      setProperty({ ...property, name: "", suggestions: [] });
    }
  };

  const handleSelectiveCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const existAlready = properties.find((item) => item.selective === "true");
    if (existAlready) {
      alert(
        `شما فقط میتوانید یک ویژگی انتخابی اضافه کنید . ویژگی انتخابی فعلی : ${existAlready.name}`
      );
    } else {
      setProperty({
        ...property,
        selective: e.target.checked
          ? SelectiveEnums.true
          : SelectiveEnums.false,
      });
    }
  };

  const handleSelectivePrice = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPropertyval({
      ...propertyval,
      price: e.target.value,
    });
  };

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    const matches = propertiesAndVals.find(
      (obj: any) => obj.name === property.name
    );

    if (matches) {
      addProperty();
    } else {
      let formData = {
        name: property.name,
      };
      const response = await call(
        axios.post(SERVER_API + "/admin/dashboard/properties", formData),
        true
      );
      if (response.status === 200) {
        addProperty();
        loadPropertiesAndVals();
      }
    }
  };

  const addProperty = () => {
    let propertyObj: PropertiesObj = {
      name: property.name,
      selective: property.selective,
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
    setProperty({ name: "", selective: SelectiveEnums.false, suggestions: [] });
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
      if (
        matchedProperty &&
        matchedProperty.specifiedVals &&
        matchedProperty.values.length
      ) {
        const matches = matchedProperty.values.filter((obj: any) =>
          obj.value.startsWith(e.target.value)
        );
        setPropertyval({
          ...propertyval,
          value: e.target.value,
          suggestions: matches,
        });
      } else {
        setPropertyval({
          ...propertyval,
          value: e.target.value,
          suggestions: [],
        });
      }
    } else {
      setPropertyval({
        ...propertyval,
        value: e.target.value,
        suggestions: [],
      });
    }
  };

  const handleSubmitPropertyval = async (e: React.FormEvent) => {
    e.preventDefault();

    const matchedProperty = propertiesAndVals.find(
      (obj: any) => obj.name === selectedProperty
    );
    if (matchedProperty && matchedProperty.specifiedVals) {
      const matches = matchedProperty.values.find(
        (obj: any) => obj.value === propertyval.value
      );
      if (matches) {
        addPropertyval();
      } else {
        const formData = {
          propertyId: matchedProperty.propertyId,
          value: propertyval.value,
        };
        const response = await call(
          axios.post(SERVER_API + "/admin/dashboard/propertyvals", formData),
          true
        );
        if (response.status === 200) {
          addPropertyval();
          loadPropertiesAndVals();
        }
      }
    } else if (matchedProperty && !matchedProperty.specifiedVals) {
      addPropertyval();
    }
  };

  const addPropertyval = () => {
    let propertyvalue: PropertyvalsObj = {
      value: propertyval.value,
    };
    const price = parseInt(propertyval.price);
    price ? (propertyvalue.price = price) : null;
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
    setPropertyval({ value: "", price: "", suggestions: [] });
  };

  useEffect(() => {
    setPropertyval({ value: "", price: "", suggestions: [] });
  }, [selectedProperty]);

  useEffect(() => {
    console.log("property changed : ", property);
  }, [property]);

  useEffect(() => {
    console.log("propertyval changed : ", propertyval);
  }, [propertyval]);

  const handleDeletePropertyval = (name: string, value: string) => {
    const property = properties.find((property) => property.name === name);
    const filteredVals = property?.values.filter(
      (propertyval) => propertyval.value !== value
    );
    setProperties((prev) => {
      return prev.map((item) =>
        item.name === name
          ? { ...item, values: filteredVals ? filteredVals : [] }
          : item
      );
    });
  };

  const handleDeleteProperty = (name: string) => {
    const filteredProperties = properties?.filter(
      (property) => property.name !== name
    );
    setProperties([...filteredProperties]);
  };

  return (
    <div>
      <h1>مدیریت ویژگی ها</h1>
      <form onSubmit={handleSubmitProperty} className="flex-column">
        <div className="bg-green-500">
          <input
            type="text"
            placeholder="ویژگی"
            name="property"
            onBlur={() => {
              setTimeout(() => {
                setProperty((prev) => {
                  return { ...prev, suggestions: [] };
                });
              }, 1000);
            }}
            value={property.name}
            className="border"
            onChange={handleproperty}
            autoComplete="off"
          />
          <label>
            <input
              type="checkbox"
              name="selective"
              value={"true"}
              checked={
                property.selective === SelectiveEnums.true ? true : false
              }
              onChange={handleSelectiveCheck}
            />
            ویژگی انتخابی
          </label>
          {property.suggestions.length ? (
            <ul className="border bg-amber-400">
              {property.suggestions.map((suggest: any, index: any) => {
                return (
                  <li
                    key={index}
                    onClick={() =>
                      setProperty({
                        ...property,
                        name: suggest.name,
                        suggestions: [],
                      })
                    }
                  >
                    {suggest.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <br />
          <button type="submit" disabled={property.name ? false : true}>
            افزودن ویژگی
          </button>
        </div>
      </form>
      {properties.length
        ? properties.map((propertyObj: PropertiesObj, index: any) => {
            return (
              <div className="bg-amber-500 p-5" key={index}>
                <button
                  className="bg-red-500"
                  onClick={() => handleDeleteProperty(propertyObj.name)}
                >
                  حذف ویژگی
                </button>
                <h3>{propertyObj.name}</h3>
                <form
                  onSubmit={handleSubmitPropertyval}
                  className="flex-column"
                >
                  <input
                    type="text"
                    placeholder="مقدار ویژگی"
                    name="propertyval"
                    onFocus={() => {
                      setSelectedProperty(propertyObj.name);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setPropertyval((prev) => {
                          return { ...prev, suggestions: [] };
                        });
                      }, 1000);
                    }}
                    value={
                      selectedProperty === propertyObj.name
                        ? propertyval.value
                        : ""
                    }
                    onChange={handlepropertyval}
                    disabled={propertyObj.name ? false : true}
                    className="border"
                    autoComplete="off"
                  />
                  {propertyObj.selective === "true" ? (
                    <input
                      type="text"
                      placeholder="قیمت"
                      name="selectivePrice"
                      onFocus={() => {
                        setSelectedProperty(propertyObj.name);
                      }}
                      value={
                        selectedProperty === propertyObj.name
                          ? propertyval.price
                          : ""
                      }
                      onChange={handleSelectivePrice}
                      disabled={propertyObj.name ? false : true}
                      className="border"
                      autoComplete="off"
                    />
                  ) : null}
                  {propertyval.suggestions.length &&
                  selectedProperty === propertyObj.name ? (
                    <ul className="border bg-amber-400">
                      {propertyval.suggestions.map(
                        (suggest: any, index: any) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                setPropertyval({
                                  ...propertyval,
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
                  {propertyObj.selective === "true" ? (
                    <button
                      type="submit"
                      disabled={
                        propertyObj.name &&
                        propertyval.value &&
                        propertyval.price &&
                        selectedProperty === propertyObj.name
                          ? false
                          : true
                      }
                    >
                      افزودن مقدار ویژگی
                    </button>
                  ) : (
                    <button
                      type="submit"
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
                  )}
                </form>
                {propertyObj.values.length ? (
                  <ul>
                    {propertyObj.values.map(
                      (propertyvalObj: PropertyvalsObj, index: any) => {
                        return (
                          <li
                            key={index}
                            className="flex flex-row justify-between"
                          >
                            <div>
                              <button
                                className="bg-red-600"
                                onClick={() =>
                                  handleDeletePropertyval(
                                    propertyObj.name,
                                    propertyvalObj.value
                                  )
                                }
                              >
                                x
                              </button>
                              {propertyvalObj.value}
                            </div>
                            {propertyObj.selective === "true" ? (
                              <div className="bg-amber-300">
                                تومان {propertyvalObj.price}
                              </div>
                            ) : null}
                          </li>
                        );
                      }
                    )}
                  </ul>
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
};
export default PropertiesManager;

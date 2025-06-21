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
import callManager from "../../hooks/callManager";

interface PropertiesManagerProps {
  properties: PropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<PropertiesObj[]>>;
  propertiesAndVals: any;
  loadPropertiesAndVals: any;
}

interface propertyObj {
  nameString: string;
  selective: boolean;
  suggestions: string[];
}

interface propertyvalObj {
  valueString: string;
  price: string | "";
  stock: string | "";
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
    nameString: "",
    selective: false,
    suggestions: [],
  });

  const [propertyval, setPropertyval] = useState<propertyvalObj>({
    valueString: "",
    price: "",
    stock: "",
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
      setProperty({
        ...property,
        nameString: e.target.value,
        suggestions: matches,
      });
    } else {
      setProperty({ ...property, nameString: "", suggestions: [] });
    }
  };

  const handleSelectiveCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const existAlready = properties.find((item) => item.selective);
    if (existAlready) {
      alert(
        `شما فقط میتوانید یک ویژگی انتخابی اضافه کنید . ویژگی انتخابی فعلی : ${existAlready.nameString}`
      );
    } else {
      setProperty({
        ...property,
        selective: e.target.checked ? true : false,
      });
    }
  };

  //note:handleslectivePrice and handleselectiveStock maybe can merged in one function
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

  const handleSelectiveStock = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPropertyval({
      ...propertyval,
      stock: e.target.value,
    });
  };

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    const matches = propertiesAndVals.find(
      (obj: any) => obj.name === property.nameString
    );

    if (matches) {
      if (!matches.specifiedVals && property.selective)
        return alert(
          "تنها ویژگی های با مقادیر مشخص می توانند ویژگی انتخابی باشند"
        );
      addProperty(matches);
    }
    //note:if the property not exist then it wont be added
    // else {
    //   let formData = {
    //     name: property.nameString,
    //   };
    //   const response = await call(
    //     axios.post(SERVER_API + "/admin/dashboard/properties", formData),
    //     true
    //   );
    //   if (response.status === 200) {
    //     addProperty();
    //     loadPropertiesAndVals();
    //   }
    // }
  };

  const addProperty = (matchedProperty: any) => {
    let propertyObj: PropertiesObj = {
      name: matchedProperty._id,
      nameString: property.nameString,
      selective: property.selective,
      specifiedVals: matchedProperty.specifiedVals,
      type: matchedProperty.type,
      values: [],
    };
    setProperties((prev) => {
      const exist = prev.find(
        (item) => item.nameString === property.nameString
      );
      if (!exist) {
        return [...prev, propertyObj];
      } else {
        return [...prev];
      }
    });
    setProperty({
      nameString: "",
      selective: false,
      suggestions: [],
    });
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
          valueString: e.target.value,
          suggestions: matches,
        });
      } else {
        setPropertyval({
          ...propertyval,
          valueString: e.target.value,
          suggestions: [],
        });
      }
    } else {
      setPropertyval({
        ...propertyval,
        valueString: e.target.value,
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
        (obj: any) => obj.value === propertyval.valueString
      );
      if (matches) {
        addPropertyval(matches);
      }
      //note:if the propertyval not exist then it wont be added
      // else {
      //   const formData = {
      //     propertyId: matchedProperty._id,
      //     value: propertyval.valueString,
      //   };
      //   const response = await call(
      //     axios.post(SERVER_API + "/admin/dashboard/propertyvals", formData),
      //     true
      //   );
      //   if (response.status === 200) {
      //     addPropertyval();
      //     loadPropertiesAndVals();
      //   }
      // }
    } else if (matchedProperty && !matchedProperty.specifiedVals) {
      addPropertyval();
    }
  };

  const addPropertyval = (matchedPropertyval?: any) => {
    let propertyvalue: PropertyvalsObj = {
      valueString: propertyval.valueString,
    };

    propertyval.price ? (propertyvalue.price = propertyval.price) : null;
    propertyval.stock ? (propertyvalue.stock = propertyval.stock) : null;

    if (matchedPropertyval) {
      propertyvalue.value = matchedPropertyval._id;
      if (matchedPropertyval.hex) propertyvalue.hex = matchedPropertyval.hex;
    }
    setProperties((prev) => {
      const exist = prev.find((item) => item.nameString === selectedProperty);
      if (exist) {
        const existingVal = exist.values.find(
          (item) => item.valueString === propertyval.valueString
        );
        if (!existingVal) {
          return prev.map((item) =>
            item.nameString === selectedProperty
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
    setPropertyval({ valueString: "", price: "", stock: "", suggestions: [] });
  };

  useEffect(() => {
    setPropertyval({ valueString: "", price: "", stock: "", suggestions: [] });
  }, [selectedProperty]);

  const handleDeletePropertyval = (name: string, value: string) => {
    const property = properties.find(
      (property) => property.nameString === name
    );
    const filteredVals = property?.values.filter(
      (propertyval) => propertyval.valueString !== value
    );
    setProperties((prev) => {
      return prev.map((item) =>
        item.nameString === name
          ? { ...item, values: filteredVals ? filteredVals : [] }
          : item
      );
    });
  };

  const handleDeleteProperty = (name: string) => {
    const filteredProperties = properties?.filter(
      (property) => property.nameString !== name
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
            value={property.nameString}
            className="border"
            onChange={handleproperty}
            autoComplete="off"
          />
          <label>
            <input
              type="checkbox"
              name="selective"
              checked={property.selective ? true : false}
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
                        nameString: suggest.name,
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
          <button type="submit" disabled={property.nameString ? false : true}>
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
                  onClick={() => handleDeleteProperty(propertyObj.nameString)}
                >
                  حذف ویژگی
                </button>
                <h3>{propertyObj.nameString}</h3>
                <form
                  onSubmit={handleSubmitPropertyval}
                  className="flex-column"
                >
                  <input
                    type="text"
                    placeholder="مقدار ویژگی"
                    name="propertyval"
                    onFocus={() => {
                      setSelectedProperty(propertyObj.nameString);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setPropertyval((prev) => {
                          return { ...prev, suggestions: [] };
                        });
                      }, 1000);
                    }}
                    value={
                      selectedProperty === propertyObj.nameString
                        ? propertyval.valueString
                        : ""
                    }
                    onChange={handlepropertyval}
                    disabled={propertyObj.nameString ? false : true}
                    className="border"
                    autoComplete="off"
                  />
                  {propertyObj.selective ? (
                    <>
                      <input
                        type="text"
                        placeholder="قیمت"
                        name="selectivePrice"
                        onFocus={() => {
                          setSelectedProperty(propertyObj.nameString);
                        }}
                        value={
                          selectedProperty === propertyObj.nameString
                            ? propertyval.price
                            : ""
                        }
                        onChange={handleSelectivePrice}
                        disabled={propertyObj.nameString ? false : true}
                        className="border"
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        placeholder="موجودی انبار"
                        name="selectiveStock"
                        onFocus={() => {
                          setSelectedProperty(propertyObj.nameString);
                        }}
                        value={
                          selectedProperty === propertyObj.nameString
                            ? propertyval.stock
                            : ""
                        }
                        onChange={handleSelectiveStock}
                        disabled={propertyObj.nameString ? false : true}
                        className="border"
                        autoComplete="off"
                      />
                    </>
                  ) : null}
                  {propertyval.suggestions.length &&
                  selectedProperty === propertyObj.nameString ? (
                    <ul className="border bg-amber-400">
                      {propertyval.suggestions.map(
                        (suggest: any, index: any) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                setPropertyval({
                                  ...propertyval,
                                  valueString: suggest.value,
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
                  {propertyObj.selective ? (
                    <button
                      type="submit"
                      disabled={
                        propertyObj.nameString &&
                        propertyval.valueString &&
                        propertyval.price &&
                        propertyval.stock &&
                        selectedProperty === propertyObj.nameString
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
                        propertyObj.nameString &&
                        propertyval.valueString &&
                        selectedProperty === propertyObj.nameString
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
                                    propertyObj.nameString,
                                    propertyvalObj.valueString
                                  )
                                }
                              >
                                x
                              </button>
                              {propertyvalObj.valueString}
                            </div>
                            {propertyObj.selective ? (
                              <div className="flex flex-row gap-2">
                                <span className="bg-amber-300">
                                  تومان {propertyvalObj.price}
                                </span>
                                <span className="bg-amber-300">
                                  عدد {propertyvalObj.stock}
                                </span>
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

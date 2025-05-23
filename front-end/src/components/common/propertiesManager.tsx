import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import callManager from "../../helpers/callManager";
import { SERVER_URL, SERVER_API, DEFAULT_PRODUCT } from "../../../config";
import axios from "axios";
import LoadingButton from "../../components/common/loadingButton";
import {
  PropertiesObj,
  PropertyvalsObj,
} from "../../types/objects/propertiesObj";

const PropertiesManager = ({
  formData,
  setFormData,
  propertiesAndVals,
}: any) => {
  const { call, loading } = callManager();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [property, setProperty] = useState<any>("");
  const [propertyFocus, setPropertyFocus] = useState<any>(false);
  const [propertiesSuggest, setPropertiesSuggest] = useState<any>([]);

  const [propertyval, setPropertyval] = useState<any>("");
  const [propertyvalFocus, setPropertyvalFocus] = useState<any>(null);
  const [propertyvalsSuggest, setPropertyvalsSuggest] = useState<any>([]);

  // const [propertyvalsArr, setPropertyvalsArr] = useState<PropertyvalsObj[]>([]);
  const [properties, setProperties] = useState<PropertiesObj[]>([]);

  useEffect(() => {
    console.log("property:", property);
  }, [property]);

  useEffect(() => {
    console.log("properties:", properties);
  }, [properties]);

  const addProperty = () => {
    console.log("add property");
    let propertyObj: PropertiesObj = {
      name: property,
      values: [],
    };
    setProperties((prev) => {
      const exist = prev.find((item) => item.name === property);
      if (!exist) {
        return [...prev, propertyObj];
      } else {
        return [...prev];
      }
    });
    setProperty("");
    setPropertiesSuggest([]);
  };
  const addPropertyval = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("add propertyval", e.target);
    let propertyvalue: PropertyvalsObj = {
      value: propertyval,
    };
    setProperties((prev) => {
      const exist = prev.find((item) => item.name === property);
      console.log("prev:", prev);
      if (exist) {
        return prev.map((item) =>
          item.name === property
            ? { ...item, values: [...item.values, propertyvalue] }
            : item
        );
      } else {
        console.log("here");
        return [...prev];
      }
    });
    setPropertyval("");
  };

  const handleproperty = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProperty(e.target.value);
  };

  useEffect(() => {
    if (property) {
      const matches = propertiesAndVals.filter((obj: any) =>
        obj.name.startsWith(property)
      );
      setPropertiesSuggest(matches);
    } else {
      setPropertiesSuggest([]);
    }
  }, [property]);

  const handlepropertyval = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPropertyval(e.target.value);
  };

  useEffect(() => {
    if (propertyval) {
      const matchedProperty = propertiesAndVals.find(
        (obj: any) => obj.name === propertyvalFocus
      );
      if (matchedProperty && matchedProperty.values.length) {
        console.log("this is value array:", matchedProperty.values);
        const matches = matchedProperty.values.filter((obj: any) =>
          obj.value.startsWith(propertyval)
        );
        setPropertyvalsSuggest(matches);
      }
    } else {
      setPropertyvalsSuggest([]);
    }
  }, [propertyval]);

  return (
    <div>
      <h1>مدیریت ویژگی ها</h1>
      <form onSubmit={(e) => e.preventDefault()} className="flex-column">
        <div className="bg-green-500">
          <input
            type="text"
            placeholder="ویژگی"
            name="property"
            onFocus={() => setPropertyFocus(true)}
            onBlur={() => setPropertyFocus(false)}
            value={property}
            className="border"
            onChange={handleproperty}
          />
          {propertiesSuggest.length && propertyFocus ? (
            <ul className="border bg-amber-400">
              {propertiesSuggest.map((suggest: any, index: any) => {
                return (
                  <li key={index} onMouseDown={() => setProperty(suggest.name)}>
                    {suggest.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <button
            type="submit"
            onMouseDown={addProperty}
            disabled={property ? false : true}
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
                    onFocus={() => setPropertyvalFocus(propertyObj.name)}
                    onBlur={() => {
                      setPropertyvalFocus(null);
                      setPropertyvalsSuggest([]);
                    }}
                    className="border"
                    onChange={handlepropertyval}
                    disabled={propertyObj.name ? false : true}
                  />
                  {propertyvalsSuggest.length &&
                  propertyvalFocus === propertyObj.name ? (
                    <ul className="border bg-amber-400">
                      {propertyvalsSuggest.map((suggest: any, index: any) => {
                        return (
                          <li
                            key={index}
                            onMouseDown={() => setPropertyval(suggest.value)}
                          >
                            {suggest.value}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                  <button
                    type="submit"
                    onMouseDown={addPropertyval}
                    disabled={
                      propertyObj.name &&
                      propertyval &&
                      propertyvalFocus === propertyObj.name
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

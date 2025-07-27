import {
  PropertiesObj,
} from "../../types/objects/propertiesObj";
import PropertySuggestions from "./propertySuggestions";
import usePropertiesManagerLog from "../../hooks/logics/usePropertiesManagerLog";
import PropertyvalsManager from "./propertyvalsManager";

interface PropertiesManagerProps {
  properties: PropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<PropertiesObj[]>>;
  propertiesAndVals: any;
}

const PropertiesManager = (props: PropertiesManagerProps) => {
  const { properties, setProperties, propertiesAndVals } = props;

  const {
    setProperty,
    property,
    handleproperty,
    handleSelectiveCheck,
    handleSaveProperty,
    handleDeleteProperty,
    selectedProperty,
    setSelectedProperty,
  } = usePropertiesManagerLog({
    properties,
    setProperties,
    propertiesAndVals,
  });

  return (
    <div>
      <h1>مدیریت ویژگی ها</h1>
      <div className="flex-column bg-green-500">
        <div className="relative">
          <input
            type="text"
            placeholder="ویژگی"
            name="property"
            onBlur={() => {
              setTimeout(() => {
                setProperty((prev: any) => {
                  return { ...prev, suggestions: [] };
                });
              }, 1000);
            }}
            value={property.nameString}
            className="border"
            onChange={handleproperty}
            autoComplete="off"
          />
          <PropertySuggestions
            property={property}
            setProperty={setProperty}
          ></PropertySuggestions>
        </div>
        <label>
          <input
            type="checkbox"
            name="selective"
            checked={property.selective ? true : false}
            onChange={handleSelectiveCheck}
          />
          ویژگی انتخابی
        </label>
        <br />
        <button
          onClick={handleSaveProperty}
          disabled={property.nameString ? false : true}
        >
          افزودن ویژگی
        </button>
      </div>
      {props.properties.length
        ? props.properties.map((propertyObj: PropertiesObj, index: any) => {
            return (
              <div className="bg-amber-500 p-5" key={index}>
                <button
                  className="bg-red-500"
                  onClick={() => handleDeleteProperty(propertyObj.nameString)}
                >
                  حذف ویژگی
                </button>
                <h3>{propertyObj.nameString}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProperty(propertyObj.nameString);
                  }}
                >
                  مدیریت مقادیر ویژگی
                </button>
                {selectedProperty === propertyObj.nameString ? (
                  <PropertyvalsManager
                    properties={properties}
                    setProperties={setProperties}
                    propertiesAndVals={propertiesAndVals}
                    selectedProperty={selectedProperty}
                    propertyObj={propertyObj}
                  ></PropertyvalsManager>
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
};
export default PropertiesManager;

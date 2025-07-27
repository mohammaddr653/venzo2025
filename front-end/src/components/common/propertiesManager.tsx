import {
  PropertiesObj,
  PropertyvalsObj,
} from "../../types/objects/propertiesObj";
import DiscountManager from "./discountManager";
import PropertyvalSuggestions from "./propertyvalSuggestions";
import PropertySuggestions from "./propertySuggestions";
import usePropertiesManagerLog from "../../hooks/logics/usePropertiesManagerLog";

interface PropertiesManagerProps {
  properties: PropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<PropertiesObj[]>>;
  propertiesAndVals: any;
  loadPropertiesAndVals: any;
}

const PropertiesManager = (props: PropertiesManagerProps) => {
  const {
    setProperty,
    property,
    handleproperty,
    handlepropertyval,
    handleSelectiveCheck,
    handleSaveProperty,
    handleSavePropertyval,
    handleDeleteProperty,
    handleDeletePropertyval,
    selectedProperty,
    setSelectedProperty,
    propertyval,
    setPropertyval,
    handleSelectiveChange,
    setDiscount,
  } = usePropertiesManagerLog(props);

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
                  افزودن مقدار
                </button>
                {selectedProperty === propertyObj.nameString ? (
                  <div className="flex-column">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="مقدار ویژگی"
                        name="propertyval"
                        onBlur={() => {
                          setTimeout(() => {
                            setPropertyval((prev: any) => {
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
                      <PropertyvalSuggestions
                        propertyval={propertyval}
                        setPropertyval={setPropertyval}
                      ></PropertyvalSuggestions>
                    </div>
                    {propertyObj.selective ? (
                      <>
                        <input
                          type="text"
                          placeholder="قیمت"
                          name="price"
                          value={
                            selectedProperty === propertyObj.nameString
                              ? propertyval.price
                              : ""
                          }
                          onChange={handleSelectiveChange}
                          disabled={propertyObj.nameString ? false : true}
                          className="border"
                          autoComplete="off"
                        />
                        <DiscountManager
                          setDiscount={setDiscount}
                        ></DiscountManager>
                        <input
                          type="text"
                          placeholder="موجودی انبار"
                          name="stock"
                          value={
                            selectedProperty === propertyObj.nameString
                              ? propertyval.stock
                              : ""
                          }
                          onChange={handleSelectiveChange}
                          disabled={propertyObj.nameString ? false : true}
                          className="border"
                          autoComplete="off"
                        />
                      </>
                    ) : null}
                    <button
                      onClick={handleSavePropertyval}
                      disabled={
                        propertyObj.nameString &&
                        propertyval.valueString &&
                        (!propertyObj.selective ||
                          (propertyval.price && propertyval.stock)) &&
                        selectedProperty === propertyObj.nameString
                          ? false
                          : true
                      }
                    >
                      افزودن مقدار ویژگی
                    </button>
                  </div>
                ) : null}
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

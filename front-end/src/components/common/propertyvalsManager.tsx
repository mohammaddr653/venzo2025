import usePropertyvalsManagerLog from "../../hooks/logics/usePropertyvalsManagerLog";
import {
  ProductPropertiesObj,
  ProductPropertyvalsObj,
} from "../../types/objects/properties";
import DiscountManager from "./discountManager";
import PropertyvalSuggestions from "./propertyvalSuggestions";

interface PropertyvalsManagerProps {
  properties: ProductPropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<ProductPropertiesObj[]>>;
  propertiesAndVals: any;
  selectedProperty: any;
  propertyObj: ProductPropertiesObj;
}

const PropertyvalsManager = (props: PropertyvalsManagerProps) => {
  const propertyObj = props.propertyObj;
  const { properties, setProperties, propertiesAndVals, selectedProperty } =
    props;
  const {
    handlepropertyval,
    handleSavePropertyval,
    handleDeletePropertyval,
    propertyval,
    setPropertyval,
    handleSelectiveChange,
    discount,
    setDiscount,
    handleUpdatePropertyval,
  } = usePropertyvalsManagerLog({
    properties,
    setProperties,
    propertiesAndVals,
    selectedProperty,
  });

  return (
    <div className="bg-pink-400">
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
            value={propertyval.valueString}
            onChange={handlepropertyval}
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
              value={propertyval.price}
              onChange={handleSelectiveChange}
              className="border"
              autoComplete="off"
            />
            <DiscountManager
              discount={discount}
              setDiscount={setDiscount}
            ></DiscountManager>
            <input
              type="text"
              placeholder="موجودی انبار"
              name="stock"
              value={propertyval.stock}
              onChange={handleSelectiveChange}
              className="border"
              autoComplete="off"
            />
          </>
        ) : null}
        <button
          onClick={handleSavePropertyval}
          disabled={
            propertyval.valueString &&
            (!propertyObj.selective || (propertyval.price && propertyval.stock))
              ? false
              : true
          }
        >
          افزودن مقدار ویژگی
        </button>
      </div>
      {propertyObj.values.length ? (
        <ul>
          {propertyObj.values.map(
            (propertyvalObj: ProductPropertyvalsObj, index: any) => {
              return (
                <li key={index} className="flex flex-row justify-between">
                  <div>
                    <button
                      className="bg-red-600"
                      onClick={() => {
                        handleDeletePropertyval(
                          propertyObj,
                          propertyObj.property.specifiedVals
                            ? propertyvalObj.propertyval?.value!
                            : propertyvalObj.valueString!
                        );
                      }}
                    >
                      x
                    </button>
                    {propertyObj.property.specifiedVals
                      ? propertyvalObj.propertyval?.value!
                      : propertyvalObj.valueString!}
                  </div>
                  {propertyObj.selective ? (
                    <div className="flex flex-row gap-2">
                      <span className="bg-amber-300">
                        تومان {propertyvalObj.price}
                      </span>
                      {propertyvalObj.discount ? (
                        <span className="bg-amber-300">
                          تومان {propertyvalObj.discount.offer} قیمت در تخفیف
                        </span>
                      ) : null}
                      <span className="bg-amber-300">
                        عدد {propertyvalObj.stock}
                      </span>
                    </div>
                  ) : null}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdatePropertyval(propertyvalObj);
                    }}
                  >
                    ویرایش
                  </button>
                </li>
              );
            }
          )}
        </ul>
      ) : null}
    </div>
  );
};
export default PropertyvalsManager;

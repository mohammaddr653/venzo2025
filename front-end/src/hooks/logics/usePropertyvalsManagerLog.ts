import { useEffect, useState } from "react";
import { discountObj } from "../../types/objects/discountObj";
import {
  ProductPropertiesObj,
  ProductPropertyvalsObj,
} from "../../types/objects/properties";

interface propertyvalObj {
  valueString?: string;
  price?: string;
  discount?: discountObj | null;
  stock?: string;
  suggestions: string[];
}

interface PropertyvalsManagerProps {
  properties: ProductPropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<ProductPropertiesObj[]>>;
  propertiesAndVals: any;
  selectedProperty: any;
}

const usePropertyvalsManagerLog = ({
  properties,
  setProperties,
  propertiesAndVals,
  selectedProperty,
}: PropertyvalsManagerProps) => {
  const [propertyval, setPropertyval] = useState<propertyvalObj>({
    valueString: "",
    price: "",
    discount: null,
    stock: "",
    suggestions: [],
  });

  const [discount, setDiscount] = useState<any>(null);

  const [selectedPropertyval, setSelectedPropertyval] = useState<any>("");

  useEffect(() => {
    setPropertyval((prev: any) => {
      return {
        ...prev,
        discount: discount,
      };
    });
  }, [discount]);

  const handleSelectiveChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPropertyval({
      ...propertyval,
      [e.target.name]: e.target.value,
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
        valueString: "",
        suggestions: [],
      });
    }
  };

  const handleSavePropertyval = async () => {
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

  //note: نیاز نیست hex یا valueString داده شود . فقط آیدی بده و در اسکیما با ref بقیه مقادیر بگیر
  const addPropertyval = (matchedPropertyval?: any) => {
    let propertyvalue: ProductPropertyvalsObj = {};

    if (matchedPropertyval) {
      propertyvalue = {
        propertyval: {
          _id: matchedPropertyval._id,
          value: matchedPropertyval.value,
          propertyId: matchedPropertyval.propertyId,
          hex: matchedPropertyval.hex,
        },
      };
      matchedPropertyval.hex
        ? (propertyvalue.propertyval!.hex = matchedPropertyval.hex)
        : null;
    } else {
      propertyvalue = {
        valueString: propertyval.valueString,
      };
    }
    propertyval.price ? (propertyvalue.price = propertyval.price) : null;
    propertyval.discount
      ? (propertyvalue.discount = propertyval.discount)
      : null;
    propertyval.stock ? (propertyvalue.stock = propertyval.stock) : null;

    setProperties((prev) => {
      const exist = prev.find(
        (item) => item.property.name === selectedProperty
      );
      if (exist) {
        const updatedValues = exist.values.filter((item) => {
          if (exist.property.specifiedVals) {
            return (
              item.propertyval?.value !== propertyval.valueString &&
              item.propertyval?.value !== selectedPropertyval
            );
          } else {
            return (
              item.valueString !== propertyval.valueString &&
              item.valueString !== selectedPropertyval
            );
          }
        });
        return prev.map((item) =>
          item.property.name === selectedProperty
            ? { ...item, values: [...updatedValues, propertyvalue] }
            : item
        );
      } else {
        return [...prev];
      }
    });
    resetPropertyval();
  };

  function resetPropertyval() {
    setPropertyval({
      valueString: "",
      price: "",
      discount: null,
      stock: "",
      suggestions: [],
    });
    setSelectedPropertyval("");
  }

  useEffect(() => {
    resetPropertyval();
  }, [selectedProperty]);

  const handleUpdatePropertyval = (propertyvalObj: ProductPropertyvalsObj) => {
    setSelectedPropertyval(
      propertyvalObj.valueString ?? propertyvalObj.propertyval?.value
    );
    setPropertyval({
      valueString:
        propertyvalObj.valueString ?? propertyvalObj.propertyval?.value,
      price: propertyvalObj.price ?? "",
      discount: propertyvalObj.discount ?? null,
      stock: propertyvalObj.stock ?? "",
      suggestions: [],
    });
  };

  const handleDeletePropertyval = (
    property: ProductPropertiesObj,
    value: string
  ) => {
    let filteredVals: ProductPropertyvalsObj[] = property?.values.filter(
      (propertyval) => {
        property.property.specifiedVals
          ? propertyval.propertyval?.value !== value
          : propertyval.valueString !== value;
      }
    );
    setProperties((prev) => {
      return prev.map((item) =>
        item.property.name === property.property.name
          ? { ...item, values: filteredVals ? filteredVals : [] }
          : item
      );
    });
  };

  return {
    handlepropertyval,
    handleSavePropertyval,
    handleDeletePropertyval,
    propertyval,
    setPropertyval,
    handleSelectiveChange,
    setDiscount,
    handleUpdatePropertyval,
  };
};

export default usePropertyvalsManagerLog;

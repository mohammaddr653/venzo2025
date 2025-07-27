import { ChangeEvent, useEffect, useState } from "react";
import { useUserStore } from "../../store";
import callManager from "../callManager";
import { discountObj } from "../../types/objects/discountObj";
import {
  PropertiesObj,
  PropertyvalsObj,
} from "../../types/objects/propertiesObj";

interface propertyObj {
  nameString: string;
  selective: boolean;
  suggestions: string[];
}

interface propertyvalObj {
  valueString: string;
  price: string;
  discount: discountObj | null;
  stock: string;
  suggestions: string[];
}

interface PropertiesManagerProps {
  properties: PropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<PropertiesObj[]>>;
  propertiesAndVals: any;
  loadPropertiesAndVals: any;
}

const usePropertiesManagerLog = ({
  properties,
  setProperties,
  propertiesAndVals,
  loadPropertiesAndVals,
}: PropertiesManagerProps) => {
  const [property, setProperty] = useState<propertyObj>({
    nameString: "",
    selective: false,
    suggestions: [],
  });

  const [propertyval, setPropertyval] = useState<propertyvalObj>({
    valueString: "",
    price: "",
    discount: null,
    stock: "",
    suggestions: [],
  });

  const [selectedProperty, setSelectedProperty] = useState<any>("");
  const [discount, setDiscount] = useState<any>(null);

  useEffect(() => {
    setPropertyval((prev: any) => {
      return {
        ...prev,
        discount: discount,
      };
    });
  }, [discount]);

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

  const handleSaveProperty = async () => {
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

  const addPropertyval = (matchedPropertyval?: any) => {
    let propertyvalue: PropertyvalsObj = {
      valueString: propertyval.valueString,
    };

    propertyval.price ? (propertyvalue.price = propertyval.price) : null;
    propertyval.discount
      ? (propertyvalue.discount = propertyval.discount)
      : null;
    propertyval.stock ? (propertyvalue.stock = propertyval.stock) : null;
    console.log(propertyvalue);
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
    setPropertyval({
      valueString: "",
      price: "",
      discount: null,
      stock: "",
      suggestions: [],
    });
  };

  useEffect(() => {
    setPropertyval({
      valueString: "",
      price: "",
      discount: null,
      stock: "",
      suggestions: [],
    });
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
  return {
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
  };
};

export default usePropertiesManagerLog;

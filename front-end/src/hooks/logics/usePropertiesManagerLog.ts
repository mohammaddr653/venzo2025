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
}

const usePropertiesManagerLog = ({
  properties,
  setProperties,
  propertiesAndVals,
}: PropertiesManagerProps) => {
  const [property, setProperty] = useState<propertyObj>({
    nameString: "",
    selective: false,
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
    handleSelectiveCheck,
    handleSaveProperty,
    handleDeleteProperty,
    selectedProperty,
    setSelectedProperty,
  };
};

export default usePropertiesManagerLog;

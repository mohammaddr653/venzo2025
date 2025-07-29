import { ChangeEvent, useState } from "react";
import { ProductPropertiesObj, Property } from "../../types/objects/properties";

interface propertyObj {
  nameString: string;
  selective: boolean;
  suggestions: string[];
}

interface PropertiesManagerProps {
  properties: ProductPropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<ProductPropertiesObj[]>>;
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
        `شما فقط میتوانید یک ویژگی انتخابی اضافه کنید . ویژگی انتخابی فعلی : ${existAlready.property.name}`
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
      if (!matches.specifiedVals && property.selective) {
        alert("تنها ویژگی های با مقادیر مشخص می توانند ویژگی انتخابی باشند");
      } else {
        addProperty(matches);
      }
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

  const addProperty = (matchedProperty: Property) => {
    let propertyObj: ProductPropertiesObj = {
      property: {
        _id: matchedProperty._id!, //دیتابیس مانگو فقط انتظار دارد یک آیدی بفرستی اما این مشکلی ایجاد نمیکند چون مانگو هوشمند است
        name: matchedProperty.name,
        specifiedVals: matchedProperty.specifiedVals,
        type: matchedProperty.type,
      },
      selective: property.selective,
      values: [],
    };
    setProperties((prev) => {
      const exist = prev.find(
        (item) => item.property._id === matchedProperty._id
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

  const handleDeleteProperty = (id: string) => {
    const filteredProperties = properties?.filter(
      (item) => item.property._id !== id
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

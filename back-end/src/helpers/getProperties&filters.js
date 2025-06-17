//this function returns an array of filters that can be set on bunch of products

let updatedFilters = [];
const setFilters = (property, propertyval) => {
  const valueCreator = (propertyval) => {
    let newValue;
    newValue = {
      valueString: propertyval.valueString,
    };
    if (propertyval.hex) {
      newValue.hex = propertyval.hex;
    }
    return newValue;
  };

  const existingProperty = updatedFilters.find((item) =>
    item.name.equals(property.name)
  );
  if (existingProperty) {
    let existingPropertyval;
    existingPropertyval = existingProperty.values.find(
      (item) => item.valueString === propertyval.valueString
    );
    if (!existingPropertyval) {
      let newValue = valueCreator(propertyval);
      updatedFilters = updatedFilters.map((item) => {
        if (item === existingProperty) {
          return { ...item, values: [...item.values, newValue] };
        }
        return item;
      });
    }
  } else {
    let newProperty = {
      name: property.name,
      nameString: property.nameString,
      values: [],
    };
    let newValue = valueCreator(propertyval);
    newProperty.values.push(newValue);
    updatedFilters.push(newProperty);
  }
};

const getPropertiesAndFilters = async (properties, filters) => {
  filters ? (updatedFilters = [...filters]) : null;
  for (let item of properties) {
    for (let value of item.values) {
      filters ? setFilters(item, value) : null;
    }
  }
  return updatedFilters;
};

module.exports = getPropertiesAndFilters;

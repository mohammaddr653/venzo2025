//this function get an array of properties defined by Id's and sets the name and value String for them make it easier to read .
//it also can make the filters for you . just give it an empty array of 'filters' and get the returned array

const Property = require("../models/property");
const Propertyval = require("../models/propertyval");

let updatedFilters = [];
const setFilters = (property, specifiedVals, propertyval) => {
  const valueCreator = (specifiedVals, propertyval) => {
    let newValue;
    if (specifiedVals) {
      newValue = {
        value: propertyval._id,
        valueString: propertyval.value,
      };
      if (propertyval.hex) {
        newValue.hex = propertyval.hex;
      }
    } else {
      newValue = {
        valueString: propertyval,
      };
    }
    return newValue;
  };

  const existingProperty = updatedFilters.find((item) =>
    item.name.equals(property._id)
  );
  if (existingProperty) {
    let existingPropertyval;
    if (specifiedVals) {
      existingPropertyval = existingProperty.values.find((item) =>
        item.value.equals(propertyval._id)
      );
    } else {
      existingPropertyval = existingProperty.values.find(
        (item) => item.valueString === propertyval
      );
    }
    if (!existingPropertyval) {
      let newValue = valueCreator(specifiedVals, propertyval);
      updatedFilters = updatedFilters.map((item) => {
        if (item === existingProperty) {
          return { ...item, values: [...item.values, newValue] };
        }
        return item;
      });
    }
  } else {
    let newProperty = {
      name: property._id,
      nameString: property.name,
      values: [],
    };
    let newValue = valueCreator(specifiedVals, propertyval);
    newProperty.values.push(newValue);
    updatedFilters.push(newProperty);
  }
};

const getPropertiesAndFilters = async (properties, filters) => {
  filters ? (updatedFilters = [...filters]) : null;
  const propertiesArr = await Promise.all(
    properties.map(async (item) => {
      let newProperty = {
        name: item.name,
        nameString: "",
        selective: item.selective,
        values: [],
      };
      const property = await Property.findOne({ _id: item.name });
      newProperty.nameString = property.name;
      for (let value of item.values) {
        if (property.specifiedVals) {
          let newValue = {
            value: value.value,
            valueString: null,
          };
          value.price ? (newValue.price = value.price) : null;
          value.stock ? (newValue.stock = value.stock) : null;
          const propertyvalue = await Propertyval.findOne({
            _id: value.value,
          });
          filters
            ? setFilters(property, property.specifiedVals, propertyvalue)
            : null;
          newValue.valueString = propertyvalue.value;
          if (propertyvalue.hex) {
            newValue.hex = propertyvalue.hex;
          }
          newProperty.values.push(newValue);
        } else {
          filters
            ? setFilters(property, property.specifiedVals, value.valueString)
            : null;
          let newValue = {
            valueString: value.valueString,
          };
          value.price ? (newValue.price = value.price) : null;
          value.stock ? (newValue.stock = value.stock) : null;
          newProperty.values.push(newValue);
        }
      }
      return newProperty;
    })
  );
  return { propertiesArr, updatedFilters };
};

module.exports = getPropertiesAndFilters;

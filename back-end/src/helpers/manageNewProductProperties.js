//this function is for managing the given properties from fron-end for a product

const Property = require("../models/property");
const propertyval = require("../models/propertyval");

const manageNewProductProperties = (properties) => {
  return Promise.all(
    JSON.parse(properties).map(async (item) => {
      if (item.name && item.values.length) {
        let newProperty = {
          name: null,
          nameString: null,
          values: [],
        };
        const property = await Property.findOne({ name: item.name });
        if (property) {
          newProperty.name = property._id;
          newProperty.nameString = property.name;
          for (let value of item.values) {
            if (property.specifiedVals) {
              let newValue = {
                value: null,
                valueString: null,
              };
              const propertyvalue = await propertyval.findOne({
                value: value.value,
              });
              if (propertyvalue) {
                newValue.value = propertyvalue._id;
                newValue.valueString = propertyvalue.value;
                newProperty.values.push(newValue);
              } else {
                return false;
              }
            } else {
              let newValue = {
                valueString: null,
              };
              newValue.valueString = value.value;
              newProperty.values.push(newValue);
            }
          }
        } else {
          return false;
        }
        return newProperty;
      }
    })
  );
};
module.exports = manageNewProductProperties;

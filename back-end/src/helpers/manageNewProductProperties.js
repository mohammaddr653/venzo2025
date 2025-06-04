//this function is for managing the given properties from fron-end for a product

const Property = require("../models/property");
const Propertyval = require("../models/propertyval");

const manageNewProductProperties = (properties) => {
  return Promise.all(
    JSON.parse(properties).map(async (item) => {
      if (item.name && item.values.length) {
        let newProperty = {
          name: null,
          values: [],
        };
        newProperty.selective = item.selective === "true" ? true : false;
        const property = await Property.findOne({ name: item.name });
        if (property) {
          newProperty.name = property._id;
          for (let value of item.values) {
            if (property.specifiedVals) {
              let newValue = {
                value: null,
              };
              value.price ? (newValue.price = value.price) : null;
              value.stock ? (newValue.stock = value.stock) : null;
              const propertyvalue = await Propertyval.findOne({
                value: value.value,
              });
              if (propertyvalue) {
                newValue.value = propertyvalue._id;
                newProperty.values.push(newValue);
              } else {
                return false;
              }
            } else {
              let newValue = {
                valueString: null,
              };
              value.price ? (newValue.price = value.price) : null;
              value.stock ? (newValue.stock = value.stock) : null;
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

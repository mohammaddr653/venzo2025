//this function is for managing the given properties from fron-end for a product

const Property = require("../models/property");
const Propertyval = require("../models/propertyval");

const manageNewProductProperties = (properties) => {
  return Promise.all(
    JSON.parse(properties).map(async (item) => {
      if (item.nameString && item.values.length) {
        let newProperty = {
          name: null,
          selective: item.selective,
          values: [],
        };
        const property = await Property.findOne({ name: item.nameString });
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
                propertyId: property._id,
                value: value.valueString,
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
              newValue.valueString = value.valueString;
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

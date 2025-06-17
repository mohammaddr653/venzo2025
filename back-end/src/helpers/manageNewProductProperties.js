//this function is for managing the given properties from fron-end for a product

const Property = require("../models/property");
const Propertyval = require("../models/propertyval");

const manageNewProductProperties = (properties) => {
  return Promise.all(
    JSON.parse(properties).map(async (item) => {
      if (item.nameString && item.values.length) {
        let newProperty = {
          name: null,
          nameString: "",
          selective: item.selective,
          type: "",
          values: [],
        };
        const property = await Property.findOne({ name: item.nameString });
        if (property) {
          newProperty.name = property._id;
          newProperty.nameString = property.name;
          newProperty.type = property.type;
          for (let value of item.values) {
            if (property.specifiedVals) {
              let newValue = {
                value: null,
                valueString: "",
              };
              value.price ? (newValue.price = value.price) : null;
              value.stock ? (newValue.stock = value.stock) : null;
              const propertyvalue = await Propertyval.findOne({
                propertyId: property._id,
                value: value.valueString,
              });
              if (propertyvalue) {
                newValue.value = propertyvalue._id;
                newValue.valueString = propertyvalue.value;
                if (propertyvalue.hex) {
                  newValue.hex = propertyvalue.hex;
                }
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

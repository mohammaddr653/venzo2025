//this function get an array of properties defined by Id's and sets the name and value String for them make it easier to read .

const Property = require("../models/property");
const Propertyval = require("../models/propertyval");

const getProperties = async (properties) => {
  return await Promise.all(
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
          const propertyvalue = await Propertyval.findOne({
            _id: value.value,
          });
          newValue.valueString = propertyvalue.value;
          newProperty.values.push(newValue);
        } else {
          let newValue = {
            valueString: value.valueString,
          };
          value.price ? (newValue.price = value.price) : null;
          newProperty.values.push(newValue);
        }
      }
      return newProperty;
    })
  );
};

module.exports = getProperties;

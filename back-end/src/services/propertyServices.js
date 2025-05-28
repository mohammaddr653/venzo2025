const User = require("../models/user");
const _ = require("lodash");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart");
const deleteFile = require("../helpers/deleteFile");
const Property = require("../models/property");
const Propertyval = require("../models/propertyval");
const Product = require("../models/product");

class PropertyServices {
  async getAllProperties(req) {
    //reading all properties
    return Property.find({});
  }

  async getPropertiesWithVals(req) {
    //reading all properties with values
    const result = [];
    const properties = await Property.find({});
    for (const property of properties) {
      const data = {
        propertyId: property._id,
        name: property.name,
        specifiedVals: property.specifiedVals,
        values: [],
      };
      data.values = await Propertyval.find(
        { propertyId: property._id },
        { _id: 1, value: 1 }
      );
      result.push(data);
    }
    return result;
  }

  async seeOneProperty(req, res) {
    // reading one property from database
    return Property.findById(req.params.propertyId);
  }

  async createProperty(req, res) {
    // create property
    let property = await Property.findOne({ name: req.body.name });
    if (property) {
      return { code: 400 };
    }
    property = new Property(_.pick(req.body, ["name", "specifiedVals"]));
    await property.save();
    return {
      code: 200,
      data: _.pick(property, ["_id", "name", "specifiedVals"]),
    };
  }

  async updateProperty(req, res) {
    //if you changed the name field , it checks if its exists or not , then it updates the property
    const property = await this.seeOneProperty(req, res);
    let repeatedProperty = await Property.findOne({ name: req.body.name });
    if (repeatedProperty && property.name !== req.body.name) {
      return false;
    }
    let data = {
      name: req.body.name,
    };
    const updateOp = await Property.updateOne(
      { _id: req.params.propertyId },
      { $set: data }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  //checks if this property is not used in any product then allow it to delete
  async deleteProperty(req, res) {
    const property = await this.seeOneProperty(req, res);
    let productsInUse = await Product.find(
      {
        properties: { $elemMatch: { name: property._id } },
      },
      { name: 1, _id: 0 }
    );
    if (productsInUse && productsInUse.length) {
      productsInUse = await Promise.all(
        productsInUse.map((item) => {
          return item.name;
        })
      );
      return { code: 403, productsInUse: productsInUse };
    }
    const deleteOp = await Property.deleteOne({ _id: req.params.propertyId });

    if (deleteOp.deletedCount.valueOf() > 0) {
      return { code: 200 };
    }
    return { code: 400 };
  }
}
module.exports = new PropertyServices();

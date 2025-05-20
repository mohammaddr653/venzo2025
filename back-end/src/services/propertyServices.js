const User = require("../models/user");
const _ = require("lodash");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart");
const deleteFile = require("../helpers/deleteFile");
const Property = require("../models/property");

class PropertyServices {
  async getAllProperties(req) {
    //reading all properties
    return Property.find({});
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
    property = new Property(_.pick(req.body, ["name"]));
    await property.save();
    return { code: 200, data: _.pick(property, ["_id", "name"]) };
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

  //this method needs to be modified . after creating the propertyVal
  async deleteProperty(req, res) {
    //delete user , admin cant delete himself
    if (req.params.userId !== req.user.id) {
      const user = await this.seeOneUser(req, res);
      const deleteUserOp = await User.deleteOne({ _id: req.params.userId });
      const deleteCartOp = await Cart.deleteOne({
        userId: req.params.userId,
      });
      deleteFile("public" + user.avatar, "public" + user.avatar);
      if (
        deleteUserOp.deletedCount.valueOf() > 0 &&
        deleteCartOp.deletedCount.valueOf() > 0
      ) {
        return true;
      }
    }
    return false;
  }
}
module.exports = new PropertyServices();

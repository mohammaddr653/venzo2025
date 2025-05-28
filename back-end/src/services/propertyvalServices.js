const User = require("../models/user");
const _ = require("lodash");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart");
const deleteFile = require("../helpers/deleteFile");
const Property = require("../models/property");
const PropertyVal = require("../models/propertyval");
const { default: mongoose } = require("mongoose");

class PropertyvalServices {
  async getAllPropertyvals(req) {
    //reading all propertyvals
    return PropertyVal.find({});
  }

  async getPropertyvalsById(req) {
    //reading all propertyvals by id
    return PropertyVal.find({
      propertyId: req.params.propertyId,
    });
  }

  async seeOnePropertyval(req, res) {
    // reading one propertyval from database
    return PropertyVal.findById(req.params.propertyvalId);
  }

  async createPropertyval(req, res) {
    // create propertyval
    const propertyval = new PropertyVal({
      value: req.body.value,
    });
    const repeatedValue = await PropertyVal.find({
      propertyId: req.body.propertyId,
      value: req.body.value,
    });
    if (repeatedValue.length) return { code: 409 };
    const exist = await Property.findById(req.body.propertyId);
    if (!exist) return { code: 400 };
    propertyval.propertyId = new mongoose.Types.ObjectId(req.body.propertyId);
    await propertyval.save();
    return {
      code: 200,
      data: _.pick(propertyval, ["_id", "value", "propertyId"]),
    };
  }

  async updatePropertyval(req, res) {
    let data = {
      value: req.body.value,
    };
    const updateOp = await PropertyVal.updateOne(
      { _id: req.params.propertyvalId },
      { $set: data }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  //this method needs to be modified
  async deletePropertyval(req, res) {
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
module.exports = new PropertyvalServices();

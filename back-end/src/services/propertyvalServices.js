const User = require("../models/user");
const _ = require("lodash");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart");
const deleteFile = require("../helpers/deleteFile");
const Property = require("../models/property");
const Propertyval = require("../models/propertyval");
const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const withTransaction = require("../helpers/withTransaction");

class PropertyvalServices {
  async getAllPropertyvals(req) {
    //reading all propertyvals
    return Propertyval.find({});
  }

  async getPropertyvalsById(req) {
    //reading all propertyvals by id
    return Propertyval.find({
      propertyId: req.params.propertyId,
    });
  }

  async seeOnePropertyval(req, res) {
    // reading one propertyval from database
    return Propertyval.findById(req.params.propertyvalId);
  }

  async createPropertyval(req, res) {
    // create propertyval
    const propertyval = new Propertyval({
      value: req.body.value,
    });
    const repeatedValue = await Propertyval.find({
      propertyId: req.body.propertyId,
      value: req.body.value,
    });
    if (repeatedValue.length) return { code: 409 };
    const exist = await Property.findById(req.body.propertyId);
    if (!exist) return { code: 400 };
    if (exist.type === "color") {
      if (!req.body.hex) return { code: 400 };
      propertyval.hex = req.body.hex;
    }
    propertyval.propertyId = new mongoose.Types.ObjectId(req.body.propertyId);
    await propertyval.save();
    return {
      code: 200,
      data: _.pick(propertyval, ["_id", "value", "propertyId"]),
    };
  }

  async updatePropertyval(req, res) {
    const propertyval = await this.seeOnePropertyval(req, res);
    let repeatedPropertyval = await Propertyval.findOne({
      value: req.body.value,
    });
    if (repeatedPropertyval && propertyval.value !== req.body.value) {
      return false;
    }
    propertyval.value = req.body.value;
    const transactionResult = await withTransaction(async (session) => {
      const updateOp = await propertyval.save({ session });
      //note:the next line can be a module it repeats in propertyServices too
      const updateProducts = await Product.updateMany(
        {
          properties: {
            $elemMatch: {
              name: propertyval.propertyId,
              values: {
                $elemMatch: {
                  value: propertyval._id,
                },
              },
            },
          },
        },
        {
          $set: {
            "properties.$[outer].values.$[inner].valueString": req.body.value,
          },
        },
        {
          arrayFilters: [
            { "outer.name": propertyval.propertyId },
            { "inner.value": propertyval._id },
          ],
          session,
        }
      );
      if (updateOp && updateProducts.modifiedCount.valueOf() > 0) {
        return true;
      }
      return false;
    });
    return transactionResult;
  }

  //checks if this propertyval is not used in any product then allow it to delete
  async deletePropertyval(req, res) {
    const propertyval = await this.seeOnePropertyval(req, res);
    let productsInUse = await Product.find(
      {
        properties: {
          $elemMatch: {
            name: propertyval.propertyId,
            values: { $elemMatch: { value: propertyval._id } },
          },
        },
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
    const deleteOp = await propertyval.deleteOne({
      _id: req.params.propertyvalId,
    });

    if (deleteOp.deletedCount.valueOf() > 0) {
      return { code: 200 };
    }
    return { code: 400 };
  }
}
module.exports = new PropertyvalServices();

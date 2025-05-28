//controller
const debug = require("debug")("app");
const Property = require("../../models/property");
const productServices = require("../../services/productServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getSingleShop(req, res) {
    const result = await productServices.seeOneProduct(req, res);
    if (result) {
      return this.response({
        res,
        message: "this is single shop",
        data: result,
      });
    }
  }
  async getSingleShopWithProperties(req, res) {
    const result = await productServices.getSingleShopWithProperties(req, res);
    if (result) {
      return this.response({
        res,
        message: "this is single shop with properties",
        data: result,
      });
    }
  }
})();

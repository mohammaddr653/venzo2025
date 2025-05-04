//controller
const debug = require("debug")("app");
const categoriesServices = require("../../services/categoriesServices");
const productServices = require("../../services/productServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getProducts(req, res) {
    const result = await productServices.getAllProducts(req, res);
    this.response({
      res,
      message: "لیست تمام محصولات",
      data: result,
    });
  }

  async getShopByCategory(req, res) {
    const string = await categoriesServices.createString(req, res); //رشته دسته بندی تولید میشه که شامل دسته بندی انتخاب شده و زیرمجموعه های آن است
    const result = await productServices.getProductsByCategoryString(
      string,
      req,
      res
    ); //دریافت محصولات مطابق با رشته دسته بندی
    this.response({
      res,
      message: "this is shop , products of specific category",
      data: result,
    });
  }
})();

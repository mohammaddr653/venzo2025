//controller
const debug = require("debug")("app");
const blogServices = require("../../services/blogServices");
const categoriesServices = require("../../services/categoriesServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getArchive(req, res) {
    const string = await categoriesServices.createString(req, res); //رشته دسته بندی تولید میشه که شامل دسته بندی انتخاب شده و زیرمجموعه های آن است
    const result = await blogServices.getBlogsByCategoryString(
      string,
      req,
      res
    ); //دریافت مقالات مطابق با رشته دسته بندی
    this.response({
      res,
      message: "this is archive, blogs of specific category",
      data: result,
    });
  }
})();

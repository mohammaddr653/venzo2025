//controller
const debug = require("debug")("app");
const bannerServices = require("../../services/bannerServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getBanners(req, res) {
    const result = await bannerServices.getAllBanners(req, res);
    this.response({
      res,
      message: "لیست تمام بنر ها",
      data: result,
    });
  }
})();

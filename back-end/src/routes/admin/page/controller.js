//controller
const debug = require("debug")("app");
const bannerServices = require("../../../services/bannerServices");
const controller = require("./../../controller");
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

  async createBanner(req, res) {
    const result = await bannerServices.createBanner(req, res);
    if (result) {
      this.response({
        res,
        message: "بنر با موفقیت اضافه شد",
        data: result,
      });
    } else {
      this.response({
        res,
        message: "ساخت بنر ناموفق بود",
        code: 400,
      });
    }
  }

  async updateBanner(req, res) {
    const result = await bannerServices.updateBanner(req, res);
    if (result) {
      this.response({
        res,
        message: "بنر با موفقیت بروزرسانی شد",
      });
    } else {
      this.response({
        res,
        message: "بروزرسانی بنر ناموفق بود",
        code: 400,
      });
    }
  }

  async deleteBanner(req, res) {
    const result = await bannerServices.deleteBanner(req, res);
    if (result) {
      this.response({
        res,
        message: "بنر با موفقیت حذف شد",
      });
    } else {
      this.response({
        res,
        message: "حذف بنر ناموفق بود",
        code: 400,
      });
    }
  }
})();

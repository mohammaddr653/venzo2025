//controller
const debug = require("debug")("app");
const payServices = require("../../services/payServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async postPay(req, res) {
    const result = await payServices.postPay(req, res);
    if (result.status === 200) {
      return this.response({
        res,
        message: "here is the authority",
        data: result.data,
      });
    }
    if (result.status === 409) {
      return this.response({
        res,
        message: "این سفارش قبلا پرداخت شده است",
      });
    }
    if (result.status === 500) {
      return this.response({
        res,
        message: "انتقال به درگاه پرداخت ناموفق بود . لطفا دوباره امتحان کنید",
      });
    }

    throw new Error("unknow error happend");
  }

  async callback(req, res) {
    const result = await payServices.verifyPayment(req, res);
    if (result.status === 200) {
      return this.response({
        res,
        message: "سفارش شما تایید شد . از خرید شما متشکریم .",
      });
    }
    if (result.status === 402) {
      return this.response({
        res,
        message: "به دلیل کندی اینترنت موفق به تایید سفارش شما نشدیم ، اما جای نگرانی نیست . لطفا با پشتیبانی تماس بگیرید .",
      });
    }
    if (result.status === 400) {
      return this.response({
        res,
        message: "عملیات پرداخت ناموفق بود",
      });
    }
    if (result.status === 404) {
      return this.response({
        res,
        message: "سفارش شما یافت نشد . لطفا با پشتیبانی تماس بگیرید .",
      });
    }

    throw new Error("unknow error happend");
  }
})();

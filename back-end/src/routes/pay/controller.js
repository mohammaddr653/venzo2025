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
        message: "در حال انتقال به درگاه پرداخت...",
        data: result.data,
      });
    }
    if (result.status === 409) {
      return this.response({
        res,
        message: "این سفارش منقضی شده یا قبلا پرداخت شده است",
        code: result.status,
      });
    }
    if (result.status === 500) {
      return this.response({
        res,
        message: "انتقال به درگاه پرداخت ناموفق بود . لطفا دوباره امتحان کنید",
        code: result.status,
      });
    }

    throw new Error("unknow error happend");
  }

  async callback(req, res) {
    const result = await payServices.verifyPayment(req, res);
    return res.redirect(
      process.env.ORIGIN_URL +
        `/callback/?code=${result.status}&data=${
          result.status === 200 ? result.data : undefined
        }`
    );
  }
})();

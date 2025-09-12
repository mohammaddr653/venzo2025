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
    throw new Error("unknow error happend");
  }
})();

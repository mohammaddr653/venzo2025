//controller
const debug = require("debug")("app");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getSingleShop(req, res) {
    this.response({
      res,
      message: "this is single shop",
    });
  }
})();

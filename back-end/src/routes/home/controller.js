//controller
const debug = require("debug")("app");
const controller = require("./../controller");

module.exports = new (class extends controller {
  async getHome(req, res) {
    this.response({
      res,
      message: "this is home",
    });
  }
})();

//controller
const debug = require("debug")("app");
const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const userServices = require("../../services/userServices");

module.exports = new (class extends controller {
  async getMe(req, res) {
    return this.response({
      res,
      message: "اطلاعات استخراج شده از توکن",
      data: {
        user: req.user,
      },
    });
  }

  async logout(req, res) {
    res.clearCookie("jwt");
    return this.response({
      res,
      message: "از حساب کاربری خارج شدید",
    });
  }
})();

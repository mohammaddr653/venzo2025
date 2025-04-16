//controller
const debug = require("debug")("app");
const controller = require("./../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const userServices = require("../../services/userServices");

module.exports = new (class extends controller {
  async getRegister(req, res) {
    return this.response({
      res,
      message: "فرم ثبت نام",
    });
  }

  async getLogin(req, res) {
    return this.response({
      res,
      message: "فرم ورود",
    });
  }

  async register(req, res) {
    //same as create user
    const result = await userServices.registerUser(req, res);
    if (result.code === 400) {
      return this.response({
        res,
        message: "کاربری با این ایمیل قبلا ثبت نام کرده است",
        code: 400,
      });
    }
    this.response({
      res,
      message: "کاربر با موفقیت ثبت نام شد",
      data: result.data,
    });
  }

  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "ایمیل یا رمز عبور نامعتبر است",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "ایمیل یا رمز عبور نامعتبر است",
      });
    }
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    //storing jwt token as a httpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevent JavaScript access
      path: "/",
      sameSite: "Strict", // Helps prevent CSRF attacks
      maxAge: 3600000, // Expires in 1 hour
    });
    this.response({ res, message: "با موفقیت وارد شدید", data: { token } });
  }
})();

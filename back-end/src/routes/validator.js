const { check } = require("express-validator");

class Validator {
  constructor() {
    this.emailCheck = check("email", "فرمت ایمیل صحیح نیست").isEmail();
    this.passCheck = check(
      "password",
      "پسورد وارد شده مورد قبول نیست"
    ).notEmpty();
  }
}
module.exports = Validator;

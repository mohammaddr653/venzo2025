//validator
const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("فرمت ایمیل صحیح نیست"),
      check("name").notEmpty().withMessage("نام نمیتواند خالی باشد"),
      check("password").notEmpty().withMessage("رمز عبور نمی تواند خالی باشد"),
    ];
  }
  loginValidator() {
    return [
      check("email").isEmail().withMessage("فرمت ایمیل صحیح نیست"),
      check("password").notEmpty().withMessage("رمز عبور نمی تواند خالی باشد"),
    ];
  }
})();

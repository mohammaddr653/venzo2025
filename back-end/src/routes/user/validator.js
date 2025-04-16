//validator
const validator = require("../validator");
const { check } = require("express-validator");

module.exports = new (class extends validator {
  avatar() {
    return [check("avatar", "لطفا یک آواتار بارگزاری کنید").notEmpty()];
  }
})();

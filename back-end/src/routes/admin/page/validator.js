//validator
const { check } = require("express-validator");
const validator = require("../../validator");

module.exports = new (class extends validator {
  bannerValidator() {
    return [
      check("image", "لطفا تصویری بارگزاری کنید").notEmpty(),
      check("show", "لطفا وضعیت بنر را مشخص کنید").notEmpty(),
    ];
  }

  updateBannerValidator() {
    return [check("show", "لطفا وضعیت بنر را مشخص کنید").notEmpty()];
  }
})();

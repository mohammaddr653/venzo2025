//validator
const { check } = require("express-validator");
const validator = require("../validator");

module.exports = new (class extends validator {
  createCheck() {
    return [this.emailCheck, this.passCheck];
  }
  updateProfileCheck() {
    return [this.nameCheck];
  }
  updateCheck() {
    return [this.emailCheck];
  }
  categoryValidator() {
    return [check("name", "لطفا نام دسته بندی را انتخاب کنید").notEmpty()];
  }
  categoryUpdateCheck() {
    return [
      check("name", "لطفا نام دسته بندی را انتخاب کنید").notEmpty(),
      check("motherId", "لطفا دسته مادر را انتخاب کنید").notEmpty(),
      check("path", "لطفا لینک را تعیین کنید").notEmpty(),
    ];
  }
  productValidator() {
    return [
      check("name", "لطفا نام محصول را انتخاب کنید").notEmpty(),
      check("price", " قیمت محصول باید مقداری عددی باشد").isNumeric(),
      check("stock", " موجودی انبار باید مقداری عددی باشد").isNumeric(),
    ];
  }
  updateProductValidator() {
    return [
      check("name", "لطفا نام محصول را انتخاب کنید").notEmpty(),
      check("price", " قیمت محصول باید مقداری عددی باشد").isNumeric(),
      check("stock", " موجودی انبار باید مقداری عددی باشد").isNumeric(),
    ];
  }
  propertyValidator() {
    return [check("name", "لطفا نام ویژگی را انتخاب کنید").notEmpty()];
  }
  updatePropertyValidator() {
    return [check("name", "لطفا نام ویژگی را انتخاب کنید").notEmpty()];
  }

  propertyvalValidator() {
    return [
      check("value", "لطفا مقدار را وارد کنید").notEmpty(),
      check("propertyId", "لطفا ویژگی را مشخص کنید").notEmpty(),
    ];
  }

  updatePropertyvalValidator() {
    return [check("value", "لطفا مقدار را وارد کنید").notEmpty()];
  }

  blogValidator() {
    return [
      check("title", "لطفا عنوانی برای مقاله انتخاب کنید").notEmpty(),
      check("author", "لطفا نام نویسنده را وارد کنید").notEmpty(),
    ];
  }
  updateBlogValidator() {
    return [
      check("title", "لطفا عنوانی برای مقاله انتخاب کنید").notEmpty(),
      check("author", "لطفا نام نویسنده را وارد کنید").notEmpty(),
    ];
  }
})();

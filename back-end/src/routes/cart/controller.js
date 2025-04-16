//controller
const debug = require("debug")("app");
const mongoose = require("mongoose");
const cartServices = require("../../services/cartServices");
const productServices = require("../../services/productServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getCart(req, res) {
    //سبد خرید رو میگیره و میره تمام محصولاتی که در سبد خرید هستند رو پیدا میکنه و درون یک آرایه به سمت کاربر میفرسته
    const cart = await cartServices.seeOneCart(req, res);
    const reservedProducts = await productServices.getProductsOfCart(
      cart,
      req,
      res
    );
    //چک کردن موجودی محصولات سبد خرید ، محصولی که موجودی کافی نداشته باشد را هم از دیتابیس و هم از آرایه محصولات رزرو شده حذف میکند
    //ممکن است زمانی که این محصولات به سبد افزوده شده اند موجودی کافی بوده اما هربار که سبد خرید لود می شود باید دوباره بررسی کرد که آیا محصولات همچنان موجودی دارند یا خیر
    const finalResult = await cartServices.checkReservedProducts(
      reservedProducts,
      req,
      res
    );
    if (!finalResult) {
      req.msg =
        "بنظر می رسد بعضی محصولات سبد خرید شما به علت عدم موجودی کافی حذف شده اند";
      return this.getCart(req, res);
    }
    //قیمت نهایی را محاسبه میکند
    const totalPrice = await productServices.totalPrice(
      reservedProducts,
      req,
      res
    );
    this.response({
      res,
      message: ["this is cart", req.msg],
      data: {
        reservedProducts,
        totalPrice,
      },
    });
  }

  async addToCart(req, res) {
    const stock = await productServices.stockCheck(req, res); //تعداد در انبار
    if (stock >= 1) {
      //تعدادی که از این محصول در سبد خرید موجود داریم
      const existingRecordCount = await cartServices.existOrNot(req, res);
      if (existingRecordCount === 0) {
        const result = await cartServices.addToCart(req, res);
        if (result) {
          this.response({
            res,
            message: "این محصول به سبد خرید اضافه شد",
          });
        } else {
          this.response({
            res,
            message: "خطایی رخ داد",
            code: 400,
          });
        }
      } else {
        this.response({
          res,
          message: "این محصول در سبد خرید موجود است",
          code: 400,
        });
      }
    } else {
      this.response({
        res,
        message: "موجودی محصول کافی نیست",
        code: 400,
      });
    }
  }

  async plusCount(req, res) {
    const stock = await productServices.stockCheck(req, res); //تعداد در انبار
    if (stock >= 1) {
      //تعدادی که از این محصول در سبد خرید موجود داریم
      const existingRecordCount = await cartServices.existOrNot(req, res);
      if (existingRecordCount >= 1) {
        if (existingRecordCount + 1 <= stock) {
          const result = await cartServices.plusCount(req, res);
          if (result) {
            this.response({
              res,
              message: "تعداد محصول اضافه شد",
            });
          } else {
            this.response({
              res,
              message: "خطایی رخ داد",
              code: 400,
            });
          }
        } else {
          this.response({
            res,
            message: "موجودی محصول کافی نیست",
            code: 400,
          });
        }
      } else {
        this.response({
          res,
          message: "خطایی رخ داد",
          code: 400,
        });
      }
    } else {
      this.response({
        res,
        message: "موجودی محصول کافی نیست",
        code: 400,
      });
    }
  }

  async minusCount(req, res) {
    //تعدادی که از این محصول در سبد خرید موجود داریم
    const existingRecordCount = await cartServices.existOrNot(req, res);
    if (existingRecordCount >= 1) {
      if (existingRecordCount - 1 <= 0) {
        await cartServices.deleteReservedProduct(
          [new mongoose.Types.ObjectId(req.params.productId)],
          req,
          res
        );
        this.response({
          res,
          message: "محصول از سبد خرید حذف شد",
        });
      } else {
        const result = await cartServices.minusCount(req, res);
        if (result) {
          this.response({
            res,
            message: "تعداد محصول کم شد",
          });
        } else {
          this.response({
            res,
            message: "خطایی رخ داد",
            code: 400,
          });
        }
      }
    } else {
      req.flash("errors", "خطایی رخ داد");
    }
  }

  async deleteReservedProduct(req, res) {
    await cartServices.deleteReservedProduct(
      [new mongoose.Types.ObjectId(req.params.productId)],
      req,
      res
    );
    this.response({
      res,
      message: "محصول از سبد خرید حذف شد",
    });
  }
})();

const mongoose = require("mongoose");
const Cart = require("../models/cart");
const reservedProduct = require("../models/reservedProduct");

class CartServices {
  async checkReservedProducts(reservedProducts, req, res) {
    // چک کردن موجودی محصولات سبد خرید ، اگر موجودی کافی نیست محصول حذف شود
    let failedProductIds = [];
    reservedProducts.forEach((product) => {
      if (product.count > product.stock || product.count <= 0) {
        //اگر تعداد در سبد بیشتر از موجودی شد یا تعداد در سبد کوچکتر از صفر بود محصول از سبد حذف شود
        failedProductIds.push(product._id);
      }
    });
    if (failedProductIds.length > 0) {
      // اگر آیدی برای حذف کردن وجود دارداز دیتابیس سبد خرید حذفش کن
      await this.deleteReservedProduct(failedProductIds, req, res);
      return false;
    }
    return true;
  }

  async deleteReservedProduct(failedProductIds, req, res) {
    // حذف محصول رزرو شده از سبد خرید ، یک آرایه از آیدی محصولاتی که قصد حذف آنها از سبد خرید را دارید میگیرد
    await Cart.updateOne(
      { userId: req.user.id },
      {
        $pull: {
          reservedProducts: {
            productId: { $in: failedProductIds },
          },
        },
      }
    );
  }

  async seeOneCart(req, res) {
    // خواندن یک سبد خرید از دیتابیس
    return Cart.findOne({ userId: req.user.id });
    //yes , you are right...in Cart schima , userId is an ObjectId type & req.user.id returns a string of id . but mongoose is smart enough to handle this.
  }

  async existOrNot(req, res) {
    // تعداد فعلی کالا در سبد خرید را برمیگردونه ، اگر صفر برگشت یعنی باید یک آیتم جدید اضافه شود . اما اگر بزرگتر از صفر برگشت یعنی در سبد موجود است و فقط باید به تعداد آن اضافه شود
    let existingRecordCount = 0;
    const cart = await Cart.findOne(
      { userId: req.user.id },
      {
        reservedProducts: {
          $elemMatch: {
            productId: new mongoose.Types.ObjectId(req.params.productId),
          },
        },
      } // Fetch only the matching product in the array
    );
    if (cart.reservedProducts.length > 0) {
      existingRecordCount = cart.reservedProducts[0].count;
    }
    return existingRecordCount;
  }
  async addToCart(req, res) {
    //افزودن به سبد خرید
    const selectedProduct = new reservedProduct(
      new mongoose.Types.ObjectId(req.params.productId),
      1
    );
    //returns cart before update , or null
    return await Cart.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: { reservedProducts: selectedProduct },
      }
    );
  }

  async plusCount(req, res) {
    //افزودن به تعداد محصول
    const updateOp = await Cart.updateOne(
      {
        userId: req.user.id,
        "reservedProducts.productId": new mongoose.Types.ObjectId(
          req.params.productId
        ),
      },
      { $inc: { "reservedProducts.$.count": 1 } }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  async minusCount(req, res) {
    //کم کردن از تعداد محصول
    const updateOp = await Cart.updateOne(
      {
        userId: req.user.id,
        "reservedProducts.productId": new mongoose.Types.ObjectId(
          req.params.productId
        ),
      },
      { $inc: { "reservedProducts.$.count": -1 } }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  async deleteCart(req, res, next) {
    //حذف سبد خرید در صورتی که یوزر را حذف کردیم
    try {
      await Cart.deleteOne({ userId: req.params.userId });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new CartServices();

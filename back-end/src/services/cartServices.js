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
      const cart = await this.seeOneCart(req, res);
      await this.deleteReservedProduct(failedProductIds, cart, req, res);
      return false;
    }
    return true;
  }

  async deleteReservedProduct(failedProductIds, cart, req, res) {
    // حذف محصول رزرو شده از سبد خرید ، یک آرایه از آیدی محصولاتی که قصد حذف آنها از سبد خرید را دارید میگیرد
    cart.reservedProducts = cart.reservedProducts.filter(
      (reserved) => !failedProductIds.includes(reserved.productId.toString())
    );
    await cart.save();
  }

  async seeOneCart(req, res) {
    // خواندن یک سبد خرید از دیتابیس
    return Cart.findOne({ userId: req.user.id });
    //yes , you are right...in Cart schima , userId is an ObjectId type & req.user.id returns a string of id . but mongoose is smart enough to handle this.
  }

  async existOrNot(req, res, cart) {
    // اگر کالا در حال حاضر در سبد موجود باشه اون رو بر می گرداند وگرنه مقدار تعریف نشده برمیگردونه
    const existing = cart.reservedProducts.find((reserved) =>
      reserved.productId.equals(
        new mongoose.Types.ObjectId(req.params.productId)
      )
    );
    return existing;
  }
  async addToCart(req, res, cart) {
    //افزودن به سبد خرید
    const reservedProduct = {
      productId: new mongoose.Types.ObjectId(req.params.productId),
      count: 1,
    };
    if (req.body.selectedPropertyvalString) {
      reservedProduct.selectedPropertyvalString =
        req.body.selectedPropertyvalString;
    }
    cart.reservedProducts.push(reservedProduct);
    await cart.save();
    return true;
  }

  async plusCount(req, res, cart) {
    //افزودن به تعداد محصول
    const existing = await cart.reservedProducts.find((reserved) =>
      reserved.productId.equals(
        new mongoose.Types.ObjectId(req.params.productId)
      )
    );
    if (existing) {
      existing.count += 1;
      await cart.save();
      return true;
    }
    return false;
  }

  async minusCount(req, res, cart) {
    //کم کردن از تعداد محصول
    const existing = await cart.reservedProducts.find((reserved) =>
      reserved.productId.equals(
        new mongoose.Types.ObjectId(req.params.productId)
      )
    );
    if (existing) {
      existing.count -= 1;
      await cart.save();
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

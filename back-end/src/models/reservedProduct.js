//مشخصات محصولی که در سبد خرید کاربر ذخیره می شود
class ReservedProduct {
  constructor(productId, count) {
    (this.productId = productId), (this.count = count);
  }
}

module.exports = ReservedProduct;

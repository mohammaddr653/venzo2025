const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const Product = require("../models/product");

class ProductServices {
  async getAllProducts(req, res) {
    //خواندن تمام محصولات از دیتابیس
    return Product.find({});
  }
  async seeOneProduct(req, res) {
    // خواندن یک محصول از دیتابیس
    return Product.findById(req.params.productId);
  }

  async getProductsByCategoryString(string, req, res) {
    //خواندن محصولات مخصوص دسته بندی انتخاب شده از دیتابیس
    let array = [];
    const products = await this.getAllProducts(req, res);
    if (products) {
      products.forEach((product) => {
        if (
          product.categoryId &&
          string.includes(product.categoryId.toString())
        ) {
          array.push(product);
        }
      });
    }
    return array;
  }

  async createProduct(req, res) {
    //اضافه کردن محصول
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
    });
    if (req.body.categoryId) {
      newProduct.categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
    }
    if (req.file) {
      newProduct.img = req.file.path.replace(/\\/g, "/").substring(6); //تنظیم آدرس تصویر محصول برای ذخیره در مونگو دی بی
    }
    return newProduct.save();
  }

  //بروزرسانی محصول
  async updateProduct(req, res) {
    const product = await Product.findById(req.params.productId);
    let data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: product.categoryId,
      description: req.body.description,
      img: product.img,
    };
    if (req.body.categoryId) {
      data.categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
    }
    if (req.file) {
      deleteFile("public" + product.img, "public" + product.img);
      data.img = req.file.path.replace(/\\/g, "/").substring(6); //تنظیم آدرس تصویر پروفایل برای ذخیره در مونگو دی بی
    }
    const updateOp = await Product.updateOne(
      { _id: product.id },
      { $set: data }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  //انتقال محصولات به کتگوری دیگر بعد از حذف کتگوری فعلی
  async sendToParentCategory(parentCategoryId, req, res) {
    let newCategoryId = null; //بدون دسته بندی
    if (parentCategoryId != "root") {
      newCategoryId = parentCategoryId;
    }
    await Product.updateMany(
      { categoryId: new mongoose.Types.ObjectId(req.params.categoryId) },
      { $set: { categoryId: newCategoryId } }
    );
  }

  async deleteProduct(req, res) {
    //حذف محصول
    const product = await this.seeOneProduct(req, res);
    if (product) {
      deleteFile("public" + product.img, "public" + product.img);
      const deleteOp = await Product.deleteOne({ _id: req.params.productId });
      if (deleteOp.deletedCount.valueOf() > 0) {
        return true;
      }
    }
    return false;
  }

  async stockCheck(req, res) {
    //چک کردن موجودی محصول
    let count = 0;
    const product = await this.seeOneProduct(req, res);
    if (product) {
      count = product.stock;
    }
    return count;
  }

  async getProductsOfCart(cart, req, res) {
    // خواندن محصولات سبد خرید از دیتابیس ، اول میره محصولات رو میخونه و بعد مقدار تعداد رو به هر آبجکت محصول اضافه میکنه
    const productIds = cart.reservedProducts.map((item) =>
      item.productId.toString()
    );
    const products = await Product.find({ _id: { $in: productIds } });
    const productsWithCounts = products.map((product) => {
      const productInfo = cart.reservedProducts.find(
        (p) => p.productId.toString() === product._id.toString()
      );
      return {
        ...product.toObject(),
        count: productInfo ? productInfo.count : 0,
      };
    });
    return productsWithCounts;
  }

  async totalPrice(reservedProducts, req, res) {
    // محاسبه قیمت کل
    let totalPrice = 0;
    reservedProducts.forEach((product) => {
      totalPrice = totalPrice + product.count * product.price;
    });
    return totalPrice;
  }
}
module.exports = new ProductServices();

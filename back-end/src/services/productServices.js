const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const Product = require("../models/product");
const manageNewProductProperties = require("../helpers/manageNewProductProperties");
const getPropertiesAndFilters = require("../helpers/getProperties&filters");
const applyFilters = require("../helpers/applyFilters");
const withTransaction = require("../helpers/withTransaction");
const Cart = require("../models/cart");
const getPriceAndStock = require("../helpers/getPriceAndStock");
const cartServices = require("./cartServices");

class ProductServices {
  async getAllProducts(req, res) {
    //خواندن تمام محصولات از دیتابیس
    return Product.find({});
  }
  async seeOneProduct(req, res) {
    // خواندن یک محصول از دیتابیس
    return Product.findById(req.params.productId);
  }

  async getSingleShopWithProperties(req, res) {
    const product = await this.seeOneProduct(req, res);
    if (product && product.properties.length) {
      product.properties = (
        await getPropertiesAndFilters(product.properties)
      ).propertiesArr;
    }
    return product;
  }

  async getProductsByCategoryString(string, req, res) {
    //خواندن محصولات مخصوص دسته بندی انتخاب شده از دیتابیس
    let array = [];
    let filters = [];
    const products = await Product.find({});
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
    for (let product of array) {
      let { propertiesArr, updatedFilters } = await getPropertiesAndFilters(
        product.properties,
        filters
      );
      filters = [...updatedFilters];
      product.properties = propertiesArr;
    }
    if (Object.keys(req.query).length) {
      array = applyFilters(req, array);
    }
    return { array, filters };
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
    if (req.body.properties) {
      let properties = await manageNewProductProperties(req.body.properties);
      if (properties && properties.length) {
        properties = properties.filter((property) => property);
        newProduct.properties = properties;
      }
    } else {
      newProduct.properties = [];
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
      categoryId: req.body.categoryId === "" ? null : product.categoryId,
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
    if (req.body.properties) {
      let properties = await manageNewProductProperties(req.body.properties);
      if (properties && properties.length) {
        properties = properties.filter((property) => property);
        data.properties = properties;
      }
    } else {
      data.properties = [];
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
    //حذف محصول . محصول را همچنین از سبد خرید تمام کاربرانی که آن را دارند حذف میکند . تست شده برای یک سبد خرید . هنوز مطمئن نیستم اگر در چند سبد خرید این محصول موجود باشه چه نتیجه ای میده
    const product = await this.seeOneProduct(req, res);
    if (product) {
      deleteFile("public" + product.img, "public" + product.img);

      const transactionResult = await withTransaction(async (session) => {
        await Product.deleteOne({ _id: req.params.productId }, { session });
        await Cart.updateMany(
          {
            reservedProducts: { $elemMatch: { productId: product._id } },
          },
          { $pull: { reservedProducts: { productId: product._id } } },
          { session }
        );
        return true;
      });
      return transactionResult;
    }
    return false;
  }

  async stockCheck(req, res, cart) {
    //چک کردن موجودی محصول
    //اگر محصول ویژگی انتخابی داشت باید انبار همان ویژگی خوانده شود
    const product = await this.seeOneProduct(req, res);
    if (product) {
      const existing = await cartServices.existOrNot(req, res, cart);
      if (existing) {
        const selectedPropertyvalString = existing.selectedPropertyvalString;
        const stock = getPriceAndStock(
          selectedPropertyvalString,
          product
        ).stock;
        return stock;
      }
      return product.stock;
    } else {
      return false;
    }
  }

  async getProductsOfCart(cart, req, res) {
    // خواندن محصولات سبد خرید از دیتابیس ، اول میره محصولات رو میخونه و بعد مقدار تعداد رو به هر آبجکت محصول اضافه میکنه
    const productIds = cart.reservedProducts.map((item) =>
      item.productId.toString()
    );
    const products = await Product.find({ _id: { $in: productIds } });

    const productsWithCounts = Promise.all(
      products.map(async (product) => {
        const productInfo = cart.reservedProducts.find((p) =>
          p.productId.equals(product._id)
        );
        product.properties = (
          await getPropertiesAndFilters(product.properties)
        ).propertiesArr;
        const { price, stock, selectionString } = getPriceAndStock(
          productInfo.selectedPropertyvalString,
          product
        );
        return {
          ...product.toObject(),
          price: price,
          stock: stock,
          selectionString: selectionString,
          count: productInfo ? productInfo.count : 0,
        };
      })
    );
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

const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const Product = require("../models/product");
const applyFilters = require("../helpers/applyFilters");
const withTransaction = require("../helpers/withTransaction");
const Cart = require("../models/cart");
const getPriceAndStock = require("../helpers/getPriceAndStock");
const serviceResponse = require("../helpers/serviceResponse");

class ProductServices {
  async getAllProducts(req, res) {
    //خواندن تمام محصولات از دیتابیس
    const findOp = await Product.find({}).populate("img"); //فیلد img که رفرنس دارد را جایگذاری میکند
    return serviceResponse(200, findOp);
  }
  async seeOneProduct(req, res) {
    // خواندن یک محصول از دیتابیس
    const findOp = await Product.findById(req.params.productId).populate("img");
    return serviceResponse(200, findOp);
  }

  async getSingleShopWithProperties(req, res) {
    const { data: product } = await this.seeOneProduct(req, res);
    return serviceResponse(200, product);
  }

  async getProductsByCategoryString(categoryArr, req, res) {
    //خواندن محصولات مخصوص دسته بندی انتخاب شده از دیتابیس
    const result = await Product.aggregate([
      { $match: { categoryId: { $in: categoryArr } } },
      {
        $facet: {
          products: [],
          filters: [
            { $unwind: "$properties" },
            { $unwind: "$properties.values" },
            {
              $group: {
                _id: "$properties.nameString",
                values: {
                  $addToSet: {
                    $cond: [
                      { $ifNull: ["$properties.values.hex", false] },
                      {
                        valueString: "$properties.values.valueString",
                        hex: "$properties.values.hex",
                      },
                      {
                        valueString: "$properties.values.valueString",
                      },
                    ],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                values: {
                  $sortArray: {
                    input: "$values",
                    sortBy: { valueString: 1 },
                  },
                },
                nameString: "$_id",
              },
            },
            { $sort: { nameString: 1 } },
          ],
        },
      },
    ]);
    let filters = result[0].filters;
    let products = result[0].products;
    if (Object.keys(req.query).length) {
      products = applyFilters(req, products);
    }
    return serviceResponse(200, { products, filters });
  }

  async createProduct(req, res) {
    //اضافه کردن محصول
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      properties: JSON.parse(req.body.properties),
      img: req.body.img === "" ? null : req.body.img,
    });
    if (req.body.categoryId) {
      newProduct.categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
    }
    const saveOp = await newProduct.save();
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی محصول
  async updateProduct(req, res) {
    const product = await Product.findById(req.params.productId);
    product.name = req.body.name;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.categoryId = req.body.categoryId === "" ? null : product.categoryId;
    product.description = req.body.description;
    product.properties = JSON.parse(req.body.properties);
    product.img = req.body.img === "" ? null : req.body.img;
    if (req.body.categoryId) {
      product.categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
    }
    const saveOp = await product.save();
    return serviceResponse(200, {});
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
    return serviceResponse(200, {});
  }

  async deleteProduct(req, res) {
    //حذف محصول . محصول را همچنین از سبد خرید تمام کاربرانی که آن را دارند حذف میکند . تست شده برای یک سبد خرید . هنوز مطمئن نیستم اگر در چند سبد خرید این محصول موجود باشه چه نتیجه ای میده
    const transactionResult = await withTransaction(async (session) => {
      const deleteOp = await Product.findOneAndDelete(
        { _id: req.params.productId },
        { session }
      );
      if (deleteOp) {
        await Cart.updateMany(
          {
            reservedProducts: { $elemMatch: { productId: deleteOp._id } },
          },
          { $pull: { reservedProducts: { productId: deleteOp._id } } },
          { session }
        );
        return serviceResponse(200, deleteOp);
      }
      return serviceResponse(404, {});
    });
    if (transactionResult.status === 200 && transactionResult.data.img) {
      deleteFile(
        transactionResult.data.img.substring(1),
        transactionResult.data.img.substring(1)
      );
    }
    return transactionResult;
  }

  async stockCheck(req, res, selectedPropertyvalString) {
    //چک کردن موجودی محصول
    //اگر محصول ویژگی انتخابی داشت باید انبار همان ویژگی خوانده شود
    const { data: product } = await this.seeOneProduct(req, res);
    if (product) {
      const stock = getPriceAndStock(selectedPropertyvalString, product).stock;
      return serviceResponse(200, stock);
    } else {
      return serviceResponse(404, {});
    }
  }

  async getProductsOfCart(cart, req, res) {
    // خواندن محصولات سبد خرید از دیتابیس ، اول میره محصولات رو میخونه و بعد مقدار تعداد رو به هر آبجکت محصول اضافه میکنه
    const productIds = cart.reservedProducts.map((item) =>
      item.productId.toString()
    );
    const products = await Product.find({ _id: { $in: productIds } });

    const productsWithCounts = await Promise.all(
      products.map(async (product) => {
        const productInfo = cart.reservedProducts.find((p) =>
          p.productId.equals(product._id)
        );
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
    return serviceResponse(200, productsWithCounts);
  }

  async totalPrice(reservedProducts, req, res) {
    // محاسبه قیمت کل
    let totalPrice = 0;
    reservedProducts.forEach((product) => {
      totalPrice = totalPrice + product.count * product.price;
    });
    return serviceResponse(200, totalPrice);
  }
}
module.exports = new ProductServices();

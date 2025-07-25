const mongoose = require("mongoose");
const Product = require("../models/product");
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

  async getNewestProducts(req, res) {
    //خواندن جدیدترین محصولات از دیتابیس
    const findOp = await Product.find({})
      .sort({ updatedAt: -1 })
      .limit(15)
      .populate("img");

    return serviceResponse(200, findOp);
  }

  //note: این کوئری میتونه بعدا سنگین بشه . با اضافه کردن flag این مشکل رو حل کن
  async getOfferProducts(req, res) {
    //خواندن محصولات تخفیف دار از دیتابیس
    const findOp = await Product.find({
      $or: [
        {
          // شرط 1: property با selective: true و حداقل یک value با discount ≠ null
          properties: {
            $elemMatch: {
              selective: true,
              values: {
                $elemMatch: {
                  discount: { $ne: null },
                },
              },
            },
          },
        },
        {
          // شرط 2: هیچ property با selective: true وجود ندارد و خود محصول discount دارد
          $and: [
            { properties: { $not: { $elemMatch: { selective: true } } } },
            { discount: { $ne: null } },
          ],
        },
      ],
    })
      .sort({ updatedAt: -1 })
      .limit(15)
      .populate("img");

    return serviceResponse(200, findOp);
  }

  async getSingleShopWithProperties(req, res) {
    const { data: product } = await this.seeOneProduct(req, res);
    return serviceResponse(200, product);
  }

  async getProductsByCategoryString(categoryArr, req, res) {
    //خواندن محصولات مخصوص دسته بندی انتخاب شده از دیتابیس
    const limit = parseInt(req.query.limit) || 2;
    const page = parseInt(req.query.page) - 1 || 0;
    const skip = page * limit;
    const rawAttributes = req.query?.attributes ?? {};
    const filterConditions = Object.entries(rawAttributes).map(
      ([name, values]) => {
        const vals = Array.isArray(values) ? values : [values];
        return {
          properties: {
            $elemMatch: {
              nameString: name,
              values: {
                $elemMatch: {
                  valueString: { $in: vals },
                },
              },
            },
          },
        };
      }
    );
    const result = await Product.aggregate([
      { $match: { categoryId: { $in: categoryArr } } },
      {
        $facet: {
          products: [
            {
              $match:
                filterConditions.length > 0 ? { $and: filterConditions } : {},
            },
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                //شبیه به populate
                from: "media",
                localField: "img",
                foreignField: "_id",
                as: "img",
              },
            },
            { $unwind: { path: "$img", preserveNullAndEmptyArrays: true } },
            {
              $unset: ["img.createdAt", "img.updatedAt", "img._id", "img.__v"],
            },
          ],
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
          totalCount: [
            {
              $match:
                filterConditions.length > 0 ? { $and: filterConditions } : {},
            },
            { $count: "count" },
          ],
        },
      },
    ]);
    let filters = result[0].filters;
    let products = result[0].products;
    let totalCount = result[0].totalCount;
    return serviceResponse(200, { products, filters, totalCount });
  }

  async createProduct(req, res) {
    //اضافه کردن محصول
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount === "" ? null : JSON.parse(req.body.discount),
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
    product.discount = req.body.discount || null;
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

  //note: I think we can replace findOneAndDelete with deleteOne for better performance
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

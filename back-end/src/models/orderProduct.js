const mongoose = require("mongoose");
const discountObjSchema = require("./discountObj");
const orderPropertyObjSchema = require("./orderPropertyObj");

//محصول آماده پرداخت

const orderProduct = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: discountObjSchema, default: null },
    properties: {
      type: [orderPropertyObjSchema],
    },
    count: {
      type: Number,
      required: true,
    },
    //یک استرینگ از تمام مقدار ویژگی های انتخاب شده . فعلا که یک ویژگی انتخابی بیشتر نداریم ولی بعدا برای ویژگی های انتخابی تو در تو دست ما رو باز میذاره
    selectedPropertyvalString: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

module.exports = orderProduct;

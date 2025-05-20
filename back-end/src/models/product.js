const mongoose = require("mongoose");
const domPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);
const timestamp = require("mongoose-timestamp");
const propertyObjSchema = require("./propertyObj");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  properties: {
    type: [propertyObjSchema],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }, //دسته بندی میتواند خالی باشد ولی محصول هیچ جا نمایش داده نمی شود
  description: { type: String },
  img: { type: String, default: null },
});

productSchema.plugin(timestamp);

productSchema.pre("validate", function (next) {
  if (this.description) {
    this.description = htmlPurify.sanitize(this.description);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);

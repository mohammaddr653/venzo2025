const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const orderProduct = require("./orderProduct");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: { type: [orderProduct], default: [] },
  status: { type: String, enum: ["canceled", "pending", "paid"] },
  totalPrice: { type: Number, required: true },
  authority: { type: String, default: "" }, //شناسه پرداخت که از زرین پال میگیریم
  referenceId: { type: String, default: "" }, //شناسه تراکنش که بعد از تایید تراکنش میگیریم
});
orderSchema.plugin(timestamp);
module.exports = mongoose.model("Order", orderSchema);

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
  status: { type: String, enum: ["pending","online", "paied"] },
  totalPrice: { type: Number, required: true },
});
orderSchema.plugin(timestamp);
module.exports = mongoose.model("Order", orderSchema);

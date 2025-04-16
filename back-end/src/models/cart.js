const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const cartSchima = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reservedProducts: { type: Array, default: [] },
});
cartSchima.plugin(timestamp);
module.exports = mongoose.model("Cart", cartSchima);

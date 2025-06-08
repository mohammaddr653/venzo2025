const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  show: { type: Boolean, required: true, default: false },
});

bannerSchema.plugin(timestamp);

module.exports = mongoose.model("Banner", bannerSchema);

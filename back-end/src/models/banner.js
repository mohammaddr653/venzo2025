const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  location: {
    type: String,
    required: true,
    enum: ["main-banner", "little-banner"],
  },
  show: { type: Boolean, required: true, default: false },
});

bannerSchema.plugin(timestamp);

module.exports = mongoose.model("Banner", bannerSchema);

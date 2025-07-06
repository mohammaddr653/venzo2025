const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const mediaSchema = new mongoose.Schema({
  path: { type: String, required: true },
});

mediaSchema.plugin(timestamp);

module.exports = mongoose.model("Media", mediaSchema);

const mongoose = require("mongoose");

const urlObj = new mongoose.Schema({
  width: { type: String },
  height: { type: String },
  url: { type: String },
});

const urlsObjSchema = new mongoose.Schema(
  {
    original: { type: urlObj, required: true },
    small: { type: urlObj, default: null },
    medium: { type: urlObj, default: null },
    large: { type: urlObj, default: null },
  },
  { _id: false }
);
module.exports = urlsObjSchema;

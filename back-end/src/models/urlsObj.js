const mongoose = require("mongoose");

const urlsObjSchema = new mongoose.Schema(
  {
    original: { type: String, required: true },
    small: { type: String, default: "" },
    medium: { type: String, default: "" },
    large: { type: String, default: "" },
  },
  { _id: false }
);
module.exports = urlsObjSchema;

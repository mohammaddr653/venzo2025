const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  motherId: {
    type: mongoose.Schema.Types.Mixed,
    default: "root",
    validate: {
      validator: function (value) {
        return value === "root" || value instanceof mongoose.Types.ObjectId;
      },
    },
    ref: "Category",
  },
  type: {
    type: String,
    required: true,
    enum: ["link", "shop", "archive", "box"],
  },
  link: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.type === "link") {
          return typeof value === "string" && value.trim().length > 0;
        }
        return true;
      },
    },
  },
});
categorySchema.plugin(timestamp);
module.exports = mongoose.model("Category", categorySchema);

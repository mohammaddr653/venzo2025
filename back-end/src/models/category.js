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
      message: "motherId must be either a root or an ObjectId",
    },
    ref: "Category",
  },
  path: { type: String, default: "#"},
});
categorySchema.plugin(timestamp);
module.exports = mongoose.model("Category", categorySchema);

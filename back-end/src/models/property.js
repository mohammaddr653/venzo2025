const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  specifiedVals: { type: Boolean, required: true, default: true },
  type: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.specifiedVals) {
          return typeof value === "string" && value.trim().length > 0;
        }
        return true;
      },
    },
    enum: ["", "ordinary", "color"],
  },
});
propertySchema.plugin(timestamp);
module.exports = mongoose.model("Property", propertySchema);

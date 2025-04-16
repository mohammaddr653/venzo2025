const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchima = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  isadmin: { type: Boolean, default: false },
});
userSchima.plugin(timestamp);

module.exports = mongoose.model("User", userSchima);

const debug = require("debug")("app");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  mongoose
    .connect(config.get("db.address"))
    .then(() => debug("connected to mongodb"))
    .catch(() => debug("could not connect"));
};

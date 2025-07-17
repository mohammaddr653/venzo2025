//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.get("/dashboard", controller.dashboard.bind(controller));
router.put(
  "/dashboard",
  validator.updateCheck(),
  controller.validate.bind(controller),
  controller.updateProfile.bind(controller)
);

module.exports = router;

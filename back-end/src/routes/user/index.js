//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const uploadHandler = require("../../helpers/uploadHandler");
const fileToReqBodyHandler = require("../../middlewares/fileToReqBody");

router.get("/dashboard", controller.dashboard.bind(controller));
router.put(
  "/dashboard",
  uploadHandler("./uploads/images/avatars", "avatar", /jpeg|jpg/),
  fileToReqBodyHandler("avatar"),
  validator.updateCheck(),
  controller.validate.bind(controller),
  controller.updateProfile.bind(controller)
);

module.exports = router;

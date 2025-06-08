//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const avatarFileToReqBody = require("../../middlewares/avatarFileToReqBody");
const validator = require("./validator");
const uploadHandler = require("../../helpers/uploadHandler");

router.get("/dashboard", controller.dashboard.bind(controller));
router.put(
  "/dashboard",
  uploadHandler("./public/uploads/images/avatars", "avatar"),
  avatarFileToReqBody,
  validator.updateCheck(),
  controller.validate.bind(controller),
  controller.updateProfile.bind(controller)
);

module.exports = router;

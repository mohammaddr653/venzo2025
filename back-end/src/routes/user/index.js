//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const uploadAccountAvatar = require("../../../upload/uploadAccountAvatar");
const avatarFileToReqBody = require("../../middlewares/avatarFileToReqBody");
const validator = require("./validator");

router.get("/dashboard", controller.dashboard.bind(controller));
router.post(
  "/dashboard/avatar",
  uploadAccountAvatar.single("avatar"),
  avatarFileToReqBody,
  validator.avatar(),
  controller.validate.bind(controller),
  controller.uploadAvatar.bind(controller)
);

module.exports = router;

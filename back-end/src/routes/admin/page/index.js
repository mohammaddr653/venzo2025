//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const uploadHandler = require("../../../helpers/uploadHandler");
const fileToReqBodyHandler = require("../../../middlewares/fileToReqBody");

router.get("/banners", controller.getBanners.bind(controller));
router.post(
  "/banners",
  uploadHandler("./public/uploads/images/banners", "image"),
  fileToReqBodyHandler("image"),
  validator.bannerValidator(),
  controller.validate.bind(controller),
  controller.createBanner.bind(controller)
);
router.put("/banners/:bannerId", controller.updateBanner.bind(controller));

router.delete("/banners/:bannerId", controller.deleteBanner.bind(controller));

module.exports = router;

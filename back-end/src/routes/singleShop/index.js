//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/:productId", controller.getSingleShop.bind(controller));

module.exports = router;

//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/:categoryString", controller.getShop.bind(controller));

module.exports = router;

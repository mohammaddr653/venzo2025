//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.postPay.bind(controller));

module.exports = router;

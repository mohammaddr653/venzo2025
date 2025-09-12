//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getOrders.bind(controller));
router.get("/:orderId", controller.getOneOrder.bind(controller));
router.post("/", controller.createOrderFromCart.bind(controller));

module.exports = router;

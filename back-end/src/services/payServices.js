const mongoose = require("mongoose");
const Cart = require("../models/cart");
const reservedProduct = require("../models/reservedProduct");
const serviceResponse = require("../helpers/serviceResponse");
const { ZarinPal } = require("zarinpal-node-sdk");
const Order = require("../models/order");

class PayServices {
  async postPay(req, res) {
    //دریافت اطلاعات سفارش
    const updateOp = await Order.findOneAndUpdate(
      { _id: req.params.orderId, status: { $ne: "paid" } },
      { $set: { status: "pending" } }
    );
    
    if (!updateOp) {
      return serviceResponse(409, {});
    }

    const zarinpal = new ZarinPal({
      merchantId: process.env.MERCHANT_ID,
      sandbox: false,
    });

    const response = await zarinpal.payments.create({
      amount: updateOp.totalPrice,
      callback_url: "https://127.0.0.1:5173",
      description: "Payment for order #1234",
      mobile: "09123456789",
      email: "customer@example.com",
      cardPan: ["6219861034529007", "5022291073776543"],
      referrer_id: "affiliate123",
    });
    // let newPayment = new Payment({
    //   user: req.user.id,
    //   amount: req.session.paymentAmount,
    //   resnumber: response.data.data.authority,
    // });
    // await newPayment.save();
    return serviceResponse(200, response.data.authority);
  }
}
module.exports = new PayServices();

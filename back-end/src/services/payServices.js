const mongoose = require("mongoose");
const Cart = require("../models/cart");
const reservedProduct = require("../models/reservedProduct");
const serviceResponse = require("../helpers/serviceResponse");
const { ZarinPal } = require("zarinpal-node-sdk");
const Order = require("../models/order");

const zarinpal = new ZarinPal({
  merchantId: process.env.MERCHANT_ID,
  sandbox: true,
});

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

    const response = await zarinpal.payments.create({
      amount: updateOp.totalPrice,
      callback_url: "http://127.0.0.1:5000/api/pay/callback",
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

    //authority should be saved in database
    updateOp.authority = response.data.authority;
    const saveOp = await updateOp.save();
    if (saveOp.authority === response.data.authority) {
      return serviceResponse(200, response.data.authority);
    }
    return serviceResponse(500, {});
  }

  async verifyPayment(req, res) {
    //تایید یا رد سفارش
    const { Authority, Status } = req.query;
    if (Status === "NOK") {
      //پرداخت ناموفق
      return serviceResponse(400, {});
    }
    const findOp = await Order.findOne({ authority: Authority });
    if (!findOp) {
      //سفارش یافت نشد
      return serviceResponse(404, {});
    }

    try {
      const response = await zarinpal.verifications.verify({
        amount: findOp.totalPrice,
        authority: findOp.authority,
      });

      if (response.data.code === 100) {
        console.log("Payment Verified:");
        console.log("Reference ID:", response.data.ref_id);
        console.log("Card PAN:", response.data.card_pan);
        console.log("Fee:", response.data.fee);
      } else if (response.data.code === 101) {
        console.log("Payment already verified.");
      } else {
        console.log("Transaction failed with code:", response.data.code);
      }
      return serviceResponse(200, {});
    } catch (error) {
      console.error("Payment Verification Failed:", error);
      return serviceResponse(402, {});
    }
  }
}
module.exports = new PayServices();

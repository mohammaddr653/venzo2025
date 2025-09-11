const mongoose = require("mongoose");
const Product = require("../models/product");
const withTransaction = require("../helpers/withTransaction");
const serviceResponse = require("../helpers/serviceResponse");
const Order = require("../models/order");

class OrderServices {
  async getUserOrders(req, res) {
    //خواندن سفارش های کاربر از دیتابیس
    const findOp = await Product.find({});
    return serviceResponse(200, findOp);
  }

  async newOrderFromCart(req, res, cart) {
    //ساخت سفارش جدید
    const productsReadyToPay = [];

    const transactionResult = await withTransaction(async (session) => {
      for (let item of cart.reservedProducts) {
        if (item.selectedPropertyvalString === "") {
          const updateOp = await Product.findOneAndUpdate(
            {
              _id: item.productId,
              stock: { $gte: item.count },
            },
            { $inc: { stock: -item.count } },
            { session }
          )
            .populate({
              path: "properties.property",
              model: "Property",
            })
            .populate({
              path: "properties.values.propertyval",
              model: "Propertyval",
            });

          if (updateOp) {
            const orderProduct = {
              productId: updateOp._id,
              name: updateOp.name,
              price: updateOp.price,
              discount: updateOp.discount,
              properties: updateOp.properties,
              count: item.count,
              selectedPropertyvalString: item.selectedPropertyvalString,
            };
            productsReadyToPay.push(orderProduct);
          } else {
            throw new Error("Insufficient stock");
          }
        } else {
          const updateOp = await Product.findOneAndUpdate(
            {
              _id: item.productId,
            },
            { $inc: { "properties.$[prop].values.$[val].stock": -item.count } },
            {
              arrayFilters: [
                { "prop.selective": true },
                {
                  "val.propertyval": item.selectedPropertyvalString,
                  "val.stock": { $gte: item.count },
                },
              ],
              session,
            }
          )
            .populate({ path: "properties.property", model: "Property" })
            .populate({
              path: "properties.values.propertyval",
              model: "Propertyval",
            });

          if (updateOp) {
            const orderProduct = {
              productId: updateOp._id,
              name: updateOp.name,
              price: updateOp.price,
              discount: updateOp.discount,
              properties: updateOp.properties,
              count: item.count,
              selectedPropertyvalString: item.selectedPropertyvalString,
            };
            productsReadyToPay.push(orderProduct);
          } else {
            throw new Error("Insufficient stock");
          }
        }
      }
      const newOrder = new Order({
        userId: req.user.id,
        products: productsReadyToPay,
        status: "pending",
        totalPrice: 23,
      });

      const saveOp = await newOrder.save({ session });
      return serviceResponse(200, saveOp);
    });
    return transactionResult;
  }
}
module.exports = new OrderServices();

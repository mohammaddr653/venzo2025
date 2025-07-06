const deleteFile = require("../helpers/deleteFile");
const serviceResponse = require("../helpers/serviceResponse");
const Trust = require("../models/trust");

class TrustServices {
  async getAllTrusts(req, res) {
    //خواندن تمام اعتماد ها از دیتابیس
    const findOp = await Trust.find({});
    return serviceResponse(200, findOp);
  }

  async seeOneTrust(req, res) {
    // خواندن یک اعتماد از دیتابیس
    const findOp = await Trust.findById(req.params.trustId);
    return serviceResponse(200, findOp);
  }

  async createTrust(req, res) {
    //اضافه کردن اعتماد
    const newTrust = new Trust({
      title: req.body.title,
      caption: req.body.caption,
      show: req.body.show,
    });
    if (req.file) {
      newTrust.image = "/" + req.file.path.replace(/\\/g, "/"); //تنظیم آدرس تصویر اعتماد برای ذخیره در مونگو دی بی
    }

    const saveOp = await newTrust.save();
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی اعتماد
  async updateTrust(req, res) {
    let data = {
      title: req.body.title,
      caption: req.body.caption,
      show: req.body.show,
    };
    const updateOp = await Trust.findOneAndUpdate(
      { _id: req.params.trustId },
      { $set: data }
    );
    if (updateOp) {
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async deleteTrust(req, res) {
    //حذف اعتماد
    const deleteOp = await Trust.findOneAndDelete({ _id: req.params.trustId });
    if (deleteOp) {
      deleteOp.image
        ? deleteFile(deleteOp.image.substring(1), deleteOp.image.substring(1))
        : null;
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new TrustServices();

const deleteFile = require("../helpers/deleteFile");
const Trust = require("../models/trust");

class TrustServices {
  async getAllTrusts(req, res) {
    //خواندن تمام اعتماد ها از دیتابیس
    return Trust.find({});
  }

  async seeOneTrust(req, res) {
    // خواندن یک اعتماد از دیتابیس
    return Trust.findById(req.params.trustId);
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

    return newTrust.save();
  }

  //بروزرسانی اعتماد
  async updateTrust(req, res) {
    const trust = await this.seeOneTrust(req, res);
    let data = {
      title: req.body.title,
      caption: req.body.caption,
      show: req.body.show,
    };
    const updateOp = await Trust.updateOne({ _id: trust.id }, { $set: data });
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  async deleteTrust(req, res) {
    //حذف اعتماد
    const trust = await this.seeOneTrust(req, res);
    if (trust) {
      deleteFile(trust.image.substring(1), trust.image.substring(1));
      const deleteOp = await Trust.deleteOne({ _id: req.params.trustId });
      if (deleteOp.deletedCount.valueOf() > 0) {
        return true;
      }
    }
    return false;
  }
}
module.exports = new TrustServices();

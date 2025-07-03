const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const Blog = require("../models/blog");
const Banner = require("../models/banner");

class BannerServices {
  async getAllBanners(req, res) {
    //خواندن تمام بنر ها از دیتابیس
    return Banner.find({});
  }

  async seeOneBanner(req, res) {
    // خواندن یک بنر از دیتابیس
    return Banner.findById(req.params.bannerId);
  }

  async createBanner(req, res) {
    //اضافه کردن بنر
    const newBanner = new Banner({
      location: req.body.location,
      show: req.body.show,
    });
    if (req.file) {
      newBanner.image = "/" + req.file.path.replace(/\\/g, "/"); //تنظیم آدرس تصویر بنر برای ذخیره در مونگو دی بی
    }

    return newBanner.save();
  }

  //بروزرسانی بنر
  async updateBanner(req, res) {
    const banner = await this.seeOneBanner(req, res);
    let data = {
      location: req.body.location,
      show: req.body.show,
    };
    const updateOp = await Banner.updateOne(
      { _id: banner.id },
      { $set: data },
      { runValidators: true }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  async deleteBanner(req, res) {
    //حذف بنر
    const banner = await this.seeOneBanner(req, res);
    if (banner) {
      deleteFile(banner.image.substring(1), banner.image.substring(1));
      const deleteOp = await Banner.deleteOne({ _id: req.params.bannerId });
      if (deleteOp.deletedCount.valueOf() > 0) {
        return true;
      }
    }
    return false;
  }
}
module.exports = new BannerServices();

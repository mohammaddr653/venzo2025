const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const Blog = require("../models/blog");
const Banner = require("../models/banner");
const serviceResponse = require("../helpers/serviceResponse");

class BannerServices {
  async getAllBanners(req, res) {
    //خواندن تمام بنر ها از دیتابیس
    const findOp = await Banner.find({});
    return serviceResponse(200, findOp);
  }

  async seeOneBanner(req, res) {
    // خواندن یک بنر از دیتابیس
    const findOp = await Banner.findById(req.params.bannerId);
    return serviceResponse(200, findOp);
  }

  async createBanner(req, res) {
    //اضافه کردن بنر
    const newBanner = new Banner({
      image: req.body.image,
      location: req.body.location,
      show: req.body.show,
    });

    const saveOp = await newBanner.save();
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی بنر
  async updateBanner(req, res) {
    let data = {
      location: req.body.location,
      show: req.body.show,
    };
    const updateOp = await Banner.findOneAndUpdate(
      { _id: req.params.bannerId },
      { $set: data },
      { runValidators: true }
    );
    if (updateOp) return serviceResponse(200, {});
    return serviceResponse(404, {});
  }

  async deleteBanner(req, res) {
    //حذف بنر
    const deleteOp = await Banner.findOneAndDelete({
      _id: req.params.bannerId,
    });
    if (deleteOp) {
      deleteOp.image
        ? deleteFile(deleteOp.image.substring(1), deleteOp.image.substring(1))
        : null;
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new BannerServices();

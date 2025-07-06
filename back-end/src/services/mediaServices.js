const deleteFile = require("../helpers/deleteFile");
const serviceResponse = require("../helpers/serviceResponse");
const Media = require("../models/media");

class MediaServices {
  async getAllMedias(req, res) {
    //خواندن تمام رسانه ها از دیتابیس
    const findOp = await Media.find({});
    return serviceResponse(200, findOp);
  }

  async seeOneMedia(req, res) {
    // خواندن یک رسانه از دیتابیس
    const findOp = await Media.findById(req.params.mediaId);
    return serviceResponse(200, findOp);
  }

  async createMedia(req, res) {
    //اضافه کردن رسانه
    const newMedia = new Media({
      path: "/" + req.file.path.replace(/\\/g, "/"), //تنظیم آدرس تصویر اعتماد برای ذخیره در مونگو دی بی
    });

    const saveOp = await newMedia.save();
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی رسانه
  async updateMedia(req, res) {
    const media = await Media.findById(req.params.mediaId);
    if (media) {
      if (req.file) {
        media.path
          ? deleteFile(media.path.substring(1), media.path.substring(1))
          : null;
        media.path = "/" + req.file.path.replace(/\\/g, "/"); //تنظیم آدرس رسانه برای ذخیره در مونگو دی بی
      }
      const saveOp = await media.save();
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async deleteMedia(req, res) {
    //حذف رسانه
    const deleteOp = await Media.findOneAndDelete({ _id: req.params.mediaId });
    if (deleteOp) {
      deleteOp.path
        ? deleteFile(deleteOp.path.substring(1), deleteOp.path.substring(1))
        : null;
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new MediaServices();

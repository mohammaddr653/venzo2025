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
    let medias = [];
    for (let file of req.files) {
      const newMedia = {
        media: "/" + file.path.replace(/\\/g, "/"), //تنظیم آدرس تصویر اعتماد برای ذخیره در مونگو دی بی
      };
      medias.push(newMedia);
    }

    const saveOp = await Media.create(medias);
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی رسانه
  async updateMedia(req, res) {
    const media = await Media.findById(req.params.mediaId);
    if (media) {
      if (req.file) {
        media.media
          ? deleteFile(media.media.substring(1), media.media.substring(1))
          : null;
        media.media = "/" + req.file.path.replace(/\\/g, "/"); //تنظیم آدرس رسانه برای ذخیره در مونگو دی بی
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
      deleteOp.media
        ? deleteFile(deleteOp.media.substring(1), deleteOp.media.substring(1))
        : null;
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new MediaServices();

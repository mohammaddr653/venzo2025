const path = require("path");
const sharp = require("sharp");
const pathManager = require("../helpers/pathManager");

const compressor = (dir) => {
  const sharpHandler = async (req, res, next) => {
    if (req.files && req.files.length) {
      await Promise.all(
        req.files.map((file) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extName = path.extname(file.originalname);
          const justName = path.parse(file.originalname).name;
          const fileName = uniqueSuffix + "-" + justName;
          const directory = pathManager(dir);
          file.urls = {
            original: directory + "/" + fileName + extName,
            small: directory + "/" + fileName + "-small" + extName,
            medium: directory + "/" + fileName + "-medium" + extName,
            large: directory + "/" + fileName + "-large" + extName,
          };
          for (let url of Object.values(file.urls)) {
            sharp(file.buffer).jpeg({ quality: 70 }).toFile(url);
          }
        })
      );
    }
    if (req.file) {
      const file = req.file;
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extName = path.extname(file.originalname);
      const justName = path.parse(file.originalname).name;
      const fileName = uniqueSuffix + "-" + justName;
      const directory = pathManager(dir);
      file.urls = {
        original: directory + "/" + fileName + extName,
        small: directory + "/" + fileName + "-small" + extName,
        medium: directory + "/" + fileName + "-medium" + extName,
        large: directory + "/" + fileName + "-large" + extName,
      };
      for (let url of Object.values(file.urls)) {
        sharp(file.buffer).jpeg({ quality: 70 }).toFile(url);
      }
    }
    next();
  };
  return sharpHandler;
};

module.exports = compressor;

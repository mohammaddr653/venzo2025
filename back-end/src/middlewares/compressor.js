const sharp = require("sharp");
const pathManager = require("../helpers/pathManager");

const compressor = (dir) => {
  const sharpHandler = async (req, res, next) => {
    if (req.files && req.files.length) {
      await Promise.all(
        req.files.map((file) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const fileName = uniqueSuffix + "-" + file.originalname;
          file.path = pathManager(dir) + "/" + fileName;
          return sharp(file.buffer).jpeg({ quality: 70 }).toFile(file.path);
        })
      );
    }
    if (req.file) {
      const file = req.file;
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = uniqueSuffix + "-" + file.originalname;
      file.path = pathManager(dir) + "/" + fileName;
      await sharp(file.buffer).jpeg({ quality: 70 }).toFile(file.path);
    }
    next();
  };
  return sharpHandler;
};

module.exports = compressor;

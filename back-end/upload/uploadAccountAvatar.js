const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/images/avatars");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toString());

  if (extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;

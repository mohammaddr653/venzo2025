const productFileToReqBody = (req, res, next) => {
  if (!req.file) {
    req.body.img = null;
  } else {
    req.body.img = req.file.filename;
  }
  next();
};
module.exports = productFileToReqBody;

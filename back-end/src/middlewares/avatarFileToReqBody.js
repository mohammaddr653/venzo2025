const avatarFileToReqBody = (req, res, next) => {
  if (!req.file) {
    req.body.avatar = null;
  } else {
    req.body.avatar = req.file.filename;
  }
  next();
};
module.exports = avatarFileToReqBody;

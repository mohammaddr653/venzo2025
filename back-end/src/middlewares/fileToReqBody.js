const fileToReqBodyHandler = (fieldName) => {
  const fileToReqBody = (req, res, next) => {
    if (!req.file) {
      req.body[fieldName] = null;
    } else {
      req.body[fieldName] = req.file.filename;
    }
    next();
  };
  return fileToReqBody;
};

module.exports = fileToReqBodyHandler;

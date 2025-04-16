//using express-async-errors npm package for handeling our server side errors through application instead of try,catch
//using winston npm package for save the error logs in logfile.log
const winston = require("winston");
const deleteFile = require("../helpers/deleteFile");

module.exports = (err, req, res, next) => {
  if (req.file)
    //if some files uploaded with this req , delete them
    deleteFile(req.file.path, req.file.path);
  winston.error(err.message, err);
  res.status(500).json({ message: "(server error) something failed" });
};

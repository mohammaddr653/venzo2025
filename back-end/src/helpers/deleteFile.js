//this function checks if a file exists deletes it
const fs = require("fs");

const deleteFile = (checkPath,deletePath) => {
  fs.stat(checkPath, (err, stats) => {
    if (!err) {
      fs.unlink(deletePath, (err) => {});
    }
  });
};
module.exports = deleteFile;

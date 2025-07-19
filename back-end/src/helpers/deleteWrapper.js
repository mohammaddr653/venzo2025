//this function calls deleteFile component for all urls of file or files

const deleteFile = require("./deleteFile");

const deleteWrapper = (file) => {
  //if some files uploaded with this req , delete them
  for (let urlObj of Object.values(file.urls._doc)) //باید از _doc استفاده کنی چون مانگوز یک آبجکت سطح بالا رو برگردونده و صرفا چیزی که فکر میکنی نیست
    deleteFile(urlObj.url.substring(1));
};
module.exports = deleteWrapper;

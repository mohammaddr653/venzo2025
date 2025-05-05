//controller
const debug = require("debug")("app");
const deleteFile = require("../../helpers/deleteFile");
const userServices = require("../../services/userServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    this.response({
      res,
      message: "this is user dashboard",
      data: _.pick(req.user, ["name", "email", "isadmin"]),
    });
  }

  async updateProfile(req, res) {
    const result = await userServices.updateProfile(req, res);
    if (result) {
      this.response({
        res,
        message: " اکانت شما با موفقیت بروزرسانی شد",
      });
    } else {
      if (req.file)
        //if some files uploaded with this req , delete them
        deleteFile(req.file.path, req.file.path);

      this.response({
        res,
        code: 400,
        message: "خطا در بروزرسانی",
      });
    }
  }
})();

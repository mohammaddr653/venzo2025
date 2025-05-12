//controller
const controller = require("../controller");
const userServices = require("../../services/userServices");
const sendEmail = require("../../mails/passRecovery");

module.exports = new (class extends controller {
  async sendPassRestoreEmail(req, res) {
    const token = await userServices.createResetPasswordToken(req, res);
    if (token) {
      let content = `<a href=${
        process.env.ORIGIN_URL + "/pass-restore-form/" + token
      }>برای بازیابی رمزعبور کلیک کنید</a>`;
      sendEmail(req.body.email, content);
      return this.response({
        res,
        message: "لطفا ایمیل خود را چک کنید .",
      });
    } else {
      return this.response({
        res,
        code: 400,
        message: `خطایی وجود داشت`,
      });
    }
  }
  async restorePass(req, res) {
    const result = await userServices.passwordRestoration(req, res);
    if (result) {
      return this.response({
        res,
        message: `رمز عبور بازیابی شد`,
      });
    } else {
      return this.response({
        res,
        code: 400,
        message: `عملیات بازیابی رمز ناموفق بود`,
      });
    }
  }
})();

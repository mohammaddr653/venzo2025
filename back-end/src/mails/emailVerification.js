//راه اندازی پکیج nodemailer
const config = require("config");
const nodemailer = require("nodemailer");

const sendEmail = (address, code) => {
  const transporter = nodemailer.createTransport({
    host: config.get("gmail_host"),
    port: 587,
    secure: false,
    auth: {
      user: config.get("gmail_user"),
      pass: config.get("gmail_pass"),
    },
  });
  const mailOptions = {
    from: config.get("gmail_user"),
    to: address,
    subject: "Email Verification",
    text: code,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", info.response);
    }
  });
};

module.exports = sendEmail;

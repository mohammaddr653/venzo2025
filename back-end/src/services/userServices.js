const User = require("../models/user");
const _ = require("lodash");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart");
const deleteFile = require("../helpers/deleteFile");

class UserServices {
  async getAllUsers(req) {
    //reading all users from database except current user that is maybe admin
    return User.find({ _id: { $ne: req.user.id } });
  }

  async seeOneUser(req, res) {
    // reading one user from database
    return User.findById(req.params.userId);
  }

  async registerUser(req, res) {
    // create user , same as register , after user created , the cart will automaticly create
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return { code: 400 };
    }
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const newCart = new Cart({
      userId: user.id,
    });
    await newCart.save();
    return { code: 200, data: _.pick(user, ["_id", "name", "email"]) };
  }

  async updateUser(req, res) {
    //if you changed the email field , it checks if its exists or not , then it updates the user
    const user = await this.seeOneUser(req, res);
    let repeatedEmail = await User.findOne({ email: req.body.email });
    if (repeatedEmail && user.email !== req.body.email) {
      return false;
    }
    let data = {
      name: req.body.name,
      email: req.body.email,
    };
    const updateOp = await User.updateOne(
      { _id: req.params.userId },
      { $set: data }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  async deleteUser(req, res) {
    //delete user , admin cant delete himself
    if (req.params.userId !== req.user.id) {
      const user = await this.seeOneUser(req, res);
      const deleteUserOp = await User.deleteOne({ _id: req.params.userId });
      const deleteCartOp = await Cart.deleteOne({
        userId: req.params.userId,
      });
      deleteFile("public" + user.avatar, "public" + user.avatar);
      if (
        deleteUserOp.deletedCount.valueOf() > 0 &&
        deleteCartOp.deletedCount.valueOf() > 0
      ) {
        return true;
      }
    }
    return false;
  }

  //update profile
  async updateProfile(req, res) {
    let data = {
      name: req.body.name,
    };
    if (req.file) {
      deleteFile("public" + req.user.avatar, "public" + req.user.avatar);
      data.avatar = req.file.path.replace(/\\/g, "/").substring(6); //some modifications on file address to store in db
    }
    const updateOp = await User.updateOne({ _id: req.user.id }, { $set: data });
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  //admin update profile
  async adminUpdateProfile(req, res) {
    let data = {
      name: req.body.name,
    };
    if (req.file) {
      deleteFile("public" + req.user.avatar, "public" + req.user.avatar);
      data.avatar = req.file.path.replace(/\\/g, "/").substring(6); //some modifications on file address to store in db
    }
    const updateOp = await User.updateOne({ _id: req.user.id }, { $set: data });
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  async verifyUser(req, res) {
    const updateOp = await User.updateOne(
      { email: req.user.email },
      { $set: { verified: true } }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  async createResetPasswordToken(req, res) {
    const resetToken = crypto.randomBytes(32).toString("hex");

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    const updateOp = await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          passwordResetToken: passwordResetToken,
          passwordResetTokenExpires: passwordResetTokenExpires,
        },
      }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return resetToken;
    }
    return false;
  }

  async passwordRestoration(req, res) {
    const token = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const updateOp = await User.updateOne(
      {
        passwordResetToken: token,
        passwordResetTokenExpires: { $gt: Date.now() },
      },
      {
        $set: {
          password: bcrypt.hashSync(req.body.password, 8),
          passwordResetToken: null,
          passwordResetTokenExpires: null,
        },
      }
    );
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }
}
module.exports = new UserServices();

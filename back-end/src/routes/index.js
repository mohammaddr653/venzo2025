//managing all routes
const express = require("express");
const router = express.Router();
const homeRouter = require("./home");
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");
const archiveRouter = require("./archive");
const singleArchiveRouter = require("./singleArchive");
const shopRouter = require("./shop");
const singleShopRouter = require("./singleShop");
const cartRouter = require("./cart");
const tokenRouter = require("./token");

const {
  isLoggedIn,
  isAdmin,
  notLoggedIn,
  setReqUser,
} = require("./../middlewares/auth");
const error = require("./../middlewares/error");

router.use(setReqUser); //if invalid token exists in request header set the req.user value
router.use("/", homeRouter);
router.use("/token", tokenRouter);
router.use("/auth", notLoggedIn, authRouter);
router.use("/user", isLoggedIn, userRouter);
router.use("/admin", isLoggedIn, isAdmin, adminRouter);
router.use("/archive", archiveRouter);
router.use("/single-archive", singleArchiveRouter);
router.use("/shop", shopRouter);
router.use("/single-shop", singleShopRouter);
router.use("/cart", isLoggedIn, cartRouter);

router.use(error);

module.exports = router;

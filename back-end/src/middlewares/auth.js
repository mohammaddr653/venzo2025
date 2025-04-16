const User = require("./../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const serverResponse = require("../helpers/serverResponse");
const debug = require("debug")("app");

//this middleware checks if a valid token exists , set the value of req.user
async function setReqUser(req, res, next) {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get("jwt_key"));
      const user = await User.findById(decoded._id);
      req.user = user;
      next();
    } catch (ex) {
      req.user = undefined;
      const response = serverResponse("invalid token");
      res.status(400).json(response);
    }
  } else {
    req.user = undefined;
    next();
  }
}

//this middleware checks if req.user exists to access the account or not
async function isLoggedIn(req, res, next) {
  if (req.user) {
    return next();
  }
  const response = serverResponse("access denied");
  res.status(401).json(response); //401 means is not logged in
}

//this middleware checks if the req.user exists it cant access the auth anymore
async function notLoggedIn(req, res, next) {
  if (!req.user) return next();
  const response = serverResponse("access denied");
  res.status(403).json(response); //403 means user authenticated but cant access the next
}

//this middleware checks if user is admin to access the admin dashboard or not
async function isAdmin(req, res, next) {
  if (!req.user.isadmin) {
    const response = serverResponse("access denied");
    return res.status(403).json(response); //403 means is logged in but not admin
  }
  next();
}

module.exports = { isLoggedIn, isAdmin, notLoggedIn, setReqUser };

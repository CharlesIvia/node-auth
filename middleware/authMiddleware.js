const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv/config");
const SECRET = process.env.SECRET;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check json web token exists and is valid

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check current user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        req.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    req.locals.user = null;
    next();
  }
};

module.exports = { requireAuth };

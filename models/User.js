const mongoose = require("mongoose");
const { isEmail } = require("validator");

//Create a schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

//mongoose hooks
//fire a fn aster a doc is saved to db

userSchema.post("save", function (doc, next) {
  console.log("New user was created", doc);
  next();
});

//fire a fn b4 a doc is saved to db

userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});

const User = mongoose.model("user", userSchema); //first arg must be singular of collection in the db

module.exports = User;

const mongoose = require("mongoose");

//Create a schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [(val) => {}, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

const User = mongoose.model("user", userSchema); //first arg must be singular of collection in the db

module.exports = User;

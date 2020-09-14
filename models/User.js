const mongoose = require("mongoose");

//Create a schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("user", userSchema); //first arg must be singular of collection in the db

module.exports = User;

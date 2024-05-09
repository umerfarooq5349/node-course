const mongoose = require("mongoose");
const validator = require("validator");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  passwordConfrim: {
    type: String,
    required: true,
    minlength: 8,
    //works on only save
    validate: function (el) {
      return el === this.password;
    },
    message: "Passwords are not the same",
    select: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  photo: {
    type: String,
    required: true,
    default: "leo.jpg",
  },
});

userSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  bcrypt.hash(this.password, 12, function (err, hash) {
    this.password = hash;
  });

  this.passwordConfrim = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

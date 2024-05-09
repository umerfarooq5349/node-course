const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("../utils/appErrors");

const signupUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfrim: req.body.passwordConfrim,
    name: req.body.name,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.PRIVATE_KEY);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  const token = "jwt";
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

module.exports = { signupUser, login };

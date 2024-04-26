const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

const signupUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

module.exports = { signupUser };

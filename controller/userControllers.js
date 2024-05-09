const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    total: users.length,
    data: {
      users,
    },
  });
});

const addUser = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (id === undefined || !user) {
    res.status(404).json({
      status: "Failed to find",
      requestedAt: req.requestTime,
      data: {
        mgs: "Result doesn't exist",
      },
    });
  }
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      user,
    },
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  if (id === undefined) {
    res.status(404).json({
      status: "Failed to find",
      data: {
        mgs: "Result doesn't exist",
      },
    });
  }
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({
    status: "Record updated",
    data: {
      user,
    },
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (id === undefined) {
    res.status(404).json({
      status: "Failed to find",
      data: {
        mgs: "Result doesn't exist",
      },
    });
  }
  const user = await User.findByIdAndDelete(id);
  res.status(200).json({
    status: "Record deleted",
    data: {
      user,
    },
  });
};

// const checkUser = (req, res, next) => {
//   console.log('Checking user');
//   if (!req.body.name || !req.body.active) {
//     return res.status(404).json({
//       status: 'Invalid response',
//       requestedAt: req.requestTime,
//       data: {
//         message: 'Invalid response',
//       },
//     });
//   }
//   next();
// };

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
};

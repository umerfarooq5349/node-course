const { promisify } = require("util");
const Tour = require("./../models/toursModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// param middleware
// const checkID = (req, res, next, val) => {
//   console.log(`id: ${req.params.id}`);
//   if (req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'Failed to find',
//       requestedAt: req.requestTime,
//       data: {
//         mgs: "Result don't exist",
//       },
//     });
//   }
//   next();
// };

//protect rout middleware

const protected = catchAsync(async (req, res, next) => {
  //geting token and check it is textUnderlinePosition:
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("some")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // verify token
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.PRIVATE_KEY);
  // console.log(decoded);

  // check if user still exists
  const logedIn_user = await User.findById(decoded.id);
  if (!logedIn_user) {
    return next(new AppError("User not found", 404));
  }

  // check if user changed password after token issued

  next();
});

const authurizedUser = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("some")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // verify token
  if (!token) {
    return next(new AppError("You are not logged in! ", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.PRIVATE_KEY);
  // console.log(decoded);

  // check if user still exists
  const logedIn_user = await User.findById(decoded.id);

  if (!logedIn_user) {
    return next(new AppError("User not found", 404));
  }

  const authurized_user = await User.findOne({ role: "admin" });
  if (!authurized_user) {
    return next(new AppError("You are not authorized", 401));
  }
  next();
});

// featured tours
const featuredTours = (req, res, next) => {
  req.query.sort = "-ratingsAverage,price,duration";
  next();
};

// all tours
const getAllTours = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tour.find(), req.query);
  features.filters();
  features.sorting();
  const tour = await features.query;
  // console.log(tour);
  res.status(200).json({
    status: "success",
    total: tour.length,
    data: {
      tour,
    },
  });
});

// add tour
const addTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

// only one tour
const getTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);
  if (!tour) {
    return next(new AppError("No tour found", 404));
  }
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
});

// update tour
const updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!tour) {
    return next(new AppError("No tour found", 404));
  }

  res.status(200).json({
    status: "successfully updated",
    data: {
      tour,
    },
  });
});

// delete tour
const deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) {
    return next(new AppError("No tour found", 404));
  }
  res.status(200).json({
    status: "Record deleted",
    data: {
      tour,
    },
  });
});

const tourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: {
          $gte: 4.0,
        },
      },
    },
    {
      $group: {
        _id: "$difficulty",
        totalTours: {
          $sum: 1,
        },
        totalRatings: {
          $sum: "$ratingsQuantity",
        },
        avgRatings: {
          $avg: "$ratingsAverage",
        },
        avgPrice: {
          $avg: "$price",
        },
        minPrice: {
          $min: "$price",
        },
        maxPrice: {
          $max: "$price",
        },
      },
    },
    {
      $sort: {
        avgRatings: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "Tour stats",
    data: {
      stats,
    },
  });
});

const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});

module.exports = {
  protected,
  getAllTours,
  getTour,
  addTour,
  updateTour,
  deleteTour,
  featuredTours,
  tourStats,
  getMonthlyPlan,
  authurizedUser,
};

const Tour = require("./../models/toursModel");
const ApiFeatures = require("../utils/apiFeatures");

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

// featured tours
const featuredTours = (req, res, next) => {
  req.query.sort = "-ratingsAverage,price,duration";
  next();
};

// all tours
const getAllTours = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: "Failed to get data",
      msg: error.message,
    });
  }
};

// add tour
const addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {}
};

// only one tour
const getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {}
};

// update tour
const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "successfully updated",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed to get data",
      msg: error.message,
    });
  }
};

// delete tour
const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);
    res.status(200).json({
      status: "Record deleted",
      data: {
        tour,
      },
    });
  } catch (error) {}
};

const tourStats = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: "Failed to get data",
      msg: error.message,
    });
  }
};

const getMonthlyPlan = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  getAllTours,
  getTour,
  addTour,
  updateTour,
  deleteTour,
  featuredTours,
  tourStats,
  getMonthlyPlan,
};

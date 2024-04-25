const Express = require("express");
const {
  getAllTours,
  getTour,
  addTour,
  updateTour,
  featuredTours,
  deleteTour,
  tourStats,
  getMonthlyPlan,
} = require("../controller/tourControllers");

const router = Express.Router();

// router.param('id', checkID);
router.route("/tour-stat").get(tourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/").get(getAllTours).post(addTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
router.route("/featured").get(featuredTours, getAllTours);
module.exports = router;

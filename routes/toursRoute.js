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
  protected,
  authurizedUser,
} = require("../controller/tourControllers");

const router = Express.Router();

// router.param('id', checkID);
router.route("/tour-stat").get(protected, tourStats);
router.route("/monthly-plan/:year").get(protected, getMonthlyPlan);
router.route("/").get(protected, getAllTours).post(protected, addTour);
router
  .route("/:id")
  .get(getTour)
  .patch(protected, authurizedUser, updateTour)
  .delete(protected, authurizedUser, deleteTour);
router.route("/featured").get(protected, featuredTours, getAllTours);
module.exports = router;

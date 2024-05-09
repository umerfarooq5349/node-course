const Express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,

  deleteUser,
} = require("../controller/userControllers");
const { signupUser, login } = require("./../controller/authController");

const router = Express.Router();

// fully rest api structure url not changes on function changes
router.route("/").get(getAllUsers).post(addUser);
router.route("/:_id").get(getUser).patch(updateUser).delete(deleteUser);

// api urls changes
router.post("/signup", signupUser);
router.post("/login", login);

module.exports = router;

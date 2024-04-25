const Express = require('express');
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,

  deleteUser,
} = require('../controller/userControllers');
const router = Express.Router();

router.route('/').get(getAllUsers).post(addUser);
router.route('/:_id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

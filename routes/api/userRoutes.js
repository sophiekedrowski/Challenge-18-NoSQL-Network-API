const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser
} = require('../../controllers/userControllers');


router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);
router.route('/:userId').delete(deleteUser);


module.exports = router;



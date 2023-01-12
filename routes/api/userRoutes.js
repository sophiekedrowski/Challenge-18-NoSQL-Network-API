const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controllers/userControllers');


router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);

// router
//   .route('/:userId')
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

module.exports = router;



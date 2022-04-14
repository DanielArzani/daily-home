const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');

router.route('/').get(userController.getUsers).post(authController.addUser);

router.route('/login').post(authController.login);

router.route('/me').get(authController.protect, userController.getMe);

router
  .route('/:id')
  .get(userController.getUser)
  // findByIdAndUpdate replaces the entire doc, may change this to patch later
  .put(userController.updateUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

// All routes beneath this must have the admin role to have access to it
router.use(authController.restrictTo('admin'));

module.exports = router;

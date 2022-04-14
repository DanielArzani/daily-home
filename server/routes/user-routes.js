const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');

router.route('/').get(userController.getUsers).post(userController.addUser);

router.route('/login').post(authController.login);

router.route('/me').get(authController.protect, userController.getMe);

router
  .route('/:id')
  .get(userController.getUser)
  // findByIdAndUpdate replaces the entire doc, may change this to patch later
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

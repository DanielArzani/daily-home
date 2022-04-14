const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');

// const { authMiddleware: auth } = require('../utils/auth.js');

router.route('/').get(userController.getUsers).post(userController.addUser);

// router.route('/login').post(authController.login);

// router.route('/protected').get(auth, authController.protectedRoute);
// router.route('/protected2').get(auth, authController.protectedRoute2);

router
  .route('/:id')
  .get(userController.getUser)
  // findByIdAndUpdate replaces the entire doc, may change this to patch later
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

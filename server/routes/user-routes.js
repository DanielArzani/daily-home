const router = require('express').Router();
const userController = require('../controllers/userController.js');
const adminController = require('../controllers/adminController.js');
const authController = require('../controllers/authController.js');

/**------------------------------------------------------------------------
 * *                                INFO
 *   An admin can change his own information using the user routes
 *   An admin can change another users info using the admin routes
 *
 *------------------------------------------------------------------------**/

/**------------------------------------------------------------------------
 *                         Login and Signup routes
 *------------------------------------------------------------------------**/
router.route('/signup').post(authController.addUser);
router.route('/login').post(authController.login);

/**------------------------------------------------------------------------
 *         Must be logged in to access routes beyond this point
 *------------------------------------------------------------------------**/
router.use(authController.protect);

/**------------------------------------------------------------------------
 *                Routes that normal users have access to
 *------------------------------------------------------------------------**/
router
  .route('/me')
  .get(userController.getMe)
  .patch(userController.updateMe)
  .delete(userController.deleteMe);

/**------------------------------------------------------------------------
 *   Must have admin role in order to access routes beyond this point
 *------------------------------------------------------------------------**/
router.use(authController.restrictTo('admin'));

router.route('/').get(adminController.getUsers);

router
  .route('/:id')
  .get(adminController.getUser)
  .patch(adminController.updateUser)
  .delete(adminController.DeleteUser);

module.exports = router;

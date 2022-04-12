const router = require('express').Router();
const userController = require('../controllers/userController.js');

router.route('/').get(userController.getUsers).post(userController.addUser);

router
  .route('/:id')
  .get(userController.getUser)
  // findByIdAndUpdate replaces the entire doc, may change this to patch later
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/login').post(userController.login);

module.exports = router;

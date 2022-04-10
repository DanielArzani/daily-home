const router = require('express').Router();
const userController = require('../controllers/userController.js');

router.route('/').get(userController.getUsers);

module.exports = router;

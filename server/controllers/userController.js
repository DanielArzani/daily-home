//! Delete this later, only here for autocomplete
const mongoose = require('mongoose');
const { User } = require('../models');

/**-------------------------
 *      GET ALL USERS
 *------------------------**/
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: {
        message: error,
      },
    });
  }
};

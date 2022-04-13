const { User } = require('../models');
// took some repeated code and added them into functions
const { e, eid } = require('../utils/catchError.js');

/**-------------------------
 *         GET ME
 *------------------------**/
exports.getMe = async (req, res) => {
  try {
    console.log(req.user);
    res.end();
  } catch (error) {
    e(res, error);
  }
};

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
    e(res, error);
  }
};

/**-------------------------
 *        GET USER
 *------------------------**/
exports.getUser = async (req, res) => {
  try {
    //TODO: Change this, patch and delete to use JWT's
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      eid(res, 'user');
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    e(res, error);
  }
};

/**-------------------------
 *       CREATE USER
 *------------------------**/
exports.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    // If either username or email already exist, will throw this error
    if (error.code === 11000) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Both username and email must be unique ',
        },
      });
      return;
    }
    e(res, error);
  }
};

/**-------------------------
 *       UPDATE USER
 *------------------------**/
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    //TODO: This will need to be changed
    const user = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!user) {
      eid(res, 'user');
      return;
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    // If either username or email already exist, will throw this error
    if (error.code === 11000) {
      res.status(500).json({
        status: 'error',
        data: {
          message: 'Both username and email must be unique ',
        },
      });
      return;
    }

    e(res, error);
  }
};

/**-------------------------
 *       DELETE USER
 *------------------------**/
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      eid(res, 'user');
      return;
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    e(res, error);
  }
};

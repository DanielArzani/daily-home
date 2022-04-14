const { User } = require('../models');
const AppError = require('../utils/appError');
// to help keep code dry, will remove the need for try...catch blocks
const catchAsync = require('../utils/catchAsync.js');

// These are routes where an admin (in others words, myself) can manipulate any users data upon request by said user

/**-------------------------
 *      GET ALL USERS
 *------------------------**/
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

/**-------------------------
 *        GET USER
 *------------------------**/
exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('There is no user with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/**-------------------------
 *       UPDATE USER
 *------------------------**/
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { username, email, password, role } = req.body;

  const user = await User.findById(id).select('+password');

  if (!user) {
    return next(new AppError('There is no user with this ID', 404));
  }

  //TODO: Add validation since mongoose's validators have been turned off
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  if (role) user.role = role;

  await user.save({ validateBeforeSave: false });

  // Auth.createSendToken(user, 200, res);

  res.status(200).json({
    status: 'success',
    // token,
    data: {
      user,
    },
  });
});

/**-------------------------
 *       DELETE USER
 *------------------------**/
exports.DeleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError('There is no user with this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

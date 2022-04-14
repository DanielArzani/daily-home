const { User } = require('../models');
// const AppError = require('../utils/appError');
// to help keep code dry, will remove the need for try...catch blocks
const catchAsync = require('../utils/catchAsync.js');
const Auth = require('../utils/auth.js');

/**-------------------------
 *         GET ME
 *------------------------**/
exports.getMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id).select(['-role', '-__v']);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/**-------------------------
 *        UPDATE ME
 *------------------------**/
exports.updateMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const { username, email, password } = req.body;

  const user = await User.findById(id).select('+password');

  //TODO: Add validation since mongoose's validators have been turned off
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;

  await user.save({ validateBeforeSave: false });

  Auth.createSendToken(user, 200, res);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

/**-------------------------
 *   UPDATE MY PASSWORD
 *------------------------**/
//TODO: Create separate route for changing password

/**-------------------------
 *       DELETE ME
 *------------------------**/
exports.deleteMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  await User.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

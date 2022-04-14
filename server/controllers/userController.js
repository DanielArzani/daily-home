const { User } = require('../models');
const AppError = require('../utils/appError');
// to help keep code dry, will remove the need for try...catch blocks
const catchAsync = require('../utils/catchAsync.js');
const Auth = require('../utils/auth.js');

/**-------------------------
 *         GET ME
 *------------------------**/
exports.getMe = catchAsync(async (req, res, next) => {
  // console.log(req.user);
  res.json(req.user);
});

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
  //TODO: Change this, patch and delete to use JWT's
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/**-------------------------
 *       CREATE USER
 *------------------------**/
exports.addUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });

  Auth.createSendToken(user, 201, res);
});

/**-------------------------
 *       UPDATE USER
 *------------------------**/
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //TODO: This will need to be changed
  const user = await User.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!user) {
    return;
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/**-------------------------
 *       DELETE USER
 *------------------------**/
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const { User } = require('../models/');
const catchAsync = require('../utils/catchAsync.js');

// const jwt = require('jsonwebtoken');
const { createSendToken, signToken } = require('../utils/auth.js');

/**-------------------------
 *          LOGIN
 *------------------------**/
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // check to see if email is in database
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    eid(res, 'user', 'email or password');
    return;
  }

  // check if password is correct
  const pw = await user.isPasswordCorrect(password);
  if (!pw) {
    eid(res, 'user', 'email or password');
    return;
  }

  const user_id = user._id.toString();
  const token = signToken({ _id: user_id });

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });

  e(res, error);
});

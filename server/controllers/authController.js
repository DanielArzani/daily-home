const { User } = require('../models/');
const { e, eid } = require('../utils/catchError.js');

// const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth.js');

/**-------------------------
 *          LOGIN
 *------------------------**/
exports.login = async (req, res) => {
  try {
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
  } catch (error) {
    e(res, error);
  }
};

// Protected Route ~ Test
exports.protectedRoute = async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.user);
  res.send('Welcome to protected route');
  res.end();
};
exports.protectedRoute2 = async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.user);
  res.send('Welcome to protected route');
  res.end();
};

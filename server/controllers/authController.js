const { User } = require('../models/');
const catchAsync = require('../utils/catchAsync.js');
const Auth = require('../utils/auth.js');
const AppError = require('../utils/appError');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');

/**-------------------------
 *       CREATE USER
 *------------------------**/
exports.addUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  const user = await User.create({ username, email, password, role });

  Auth.createSendToken(user, 201, res);
});

/**-------------------------
 *          LOGIN
 *------------------------**/
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check to see if email is in database
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // check if password is correct
  const pw = await user.isPasswordCorrect(password);
  if (!pw) {
    return next(new AppError('Incorrect email or password', 401));
  }

  Auth.createSendToken(user, 200, res);
});

/**-------------------------
 *         PROTECT
 *------------------------**/
// Protects against unauthorized access ~ Can't see tour unless logged in
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Check if token exists
  let token;
  // prettier-ignore
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    // Split string into array by space, token will be at position[1]
     token = req.headers.authorization.split(" ")[1]
  } else if(req.cookies.jwt){
    token = req.cookies.jwt
  }

  // 401 -> Unauthorized
  if (!token) {
    return next(
      new AppError('You are not logged in, please log in to get access', 401)
    );
  }

  // 2) Verify token ~ In order to use this with async and await, we will promisify it
  // If an error with the token happens at this point node will send it to our global error handler (errorController)
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new AppError('The user belonging to the token no longer exists', 401)
    );

  // GRANT ACCESS TO PROTECTED ROUTE
  // We are putting the found document (currentUser) onto the req object in case we want to use it later
  req.user = currentUser;
  next();
});

/**-------------------------
 *      AUTHORIZATION
 *------------------------**/
// Set permissions and user roles
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // The protect middleware function will run before this and thus req.user will be available
    if (!roles.includes(req.user.role)) {
      return next(
        // 403 -> Forbidden
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };

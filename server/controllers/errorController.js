const AppError = require('../utils/appError');

// INVALID ID
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

// DUPLICATE FIELDS
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;

  return new AppError(message, 400);
};

// VALIDATION ERROR
const handleValidationErrorDB = (err) => {
  // Loop through all error messages
  const errors = Object.values(err.errors).map((err) => err.message);
  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
};

// JWT ERROR (Invalid JSON Web Token)
const handleJWTError = () =>
  new AppError('Invalid token, please try logging in again', 401);

// JWT ERROR (Token expired)
const handleJTWExpiryError = () =>
  new AppError('Token expired, please try logging in again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    data: {
      error: err,
      message: err.message,
      stack: err.stack,
    },
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: Send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: Don't leak error details
  } else {
    // 1) Log message so we can see it
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Something went very wrong!',
      },
    });
  }
};

// If a middleware has 4 arguments express will recognize it as an error handling middleware and only call it when there is an error
module.exports = (err, req, res, next) => {
  // This will log which line the error originated from and will also log the stack
  //   console.log(err.stack);

  // Default since we won't know what kind of error will come
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // For development we want as much info on the bug as possible but in production we simply want to give a nice human friendly error message
  if (process.env.NODE_ENV === 'development') {
    // This works
    // if (err.name === 'CastError') {
    //   sendErrorDev(err, res);
    // }
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    // Create a copy of the err object except that it has a different reference
    let error = JSON.parse(JSON.stringify(err));

    // Error for when id is incorrect
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    // Error for when a field is repeated (when its not allowed)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // Error for validation
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJTWExpiryError();

    sendErrorProd(error, res);
  }
};

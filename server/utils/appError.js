class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    // Saves us from having to write fail or error for our JSend specs
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Only errors we create our selves will have this property, we don't want to send an error that doesn't have this property (e.g. error from a package) to the client in production
    this.isOperational = true;

    // This will catch which line the error originated from and will also capture the stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

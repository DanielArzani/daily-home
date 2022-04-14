const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const { userRoutes } = require('./routes');
const AppError = require('./utils/appError');
const GlobalErrorHandler = require('./controllers/errorController.js');

const app = express();

console.log(process.env.NODE_ENV);
// Only use morgan in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**-------------------------
 *    GLOBAL MIDDLEWARE
 *------------------------**/
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**-------------------------
 *         ROUTES
 *------------------------**/
app.use('/api/v1/users', userRoutes);

// Will catch any requests (Get, Post, etc...) to non-specified routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

/**-------------------------
 *     PRODUCTION BUILD
 *------------------------**/
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // send index.html for any routes that don't exist
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.use(GlobalErrorHandler);

module.exports = app;

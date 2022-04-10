const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./config/connection.js');
const { userRoutes } = require('./routes');

require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

console.log(process.env.NODE_ENV);
// Only use morgan in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**-------------------------
 *    GLOBAL MIDDLEWARE
 *------------------------**/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**-------------------------
 *         ROUTES
 *------------------------**/
app.use('/api/v1/users', userRoutes);

// Will catch any requests (Get, Post, etc...) to non-specified routes
app.all('*', (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server`);
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

/**-------------------------
 *       CONNECTION
 *------------------------**/
db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🌍 Now listening on http://localhost:${PORT}`)
  );
});

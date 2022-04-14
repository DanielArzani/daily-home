const db = require('./config/connection.js');

/**-------------------------
 *       SYNC ERRORS
 *------------------------**/
// For Sync Errors that don't originate from Node or Express
process.on('uncaughtException', (err) => {
  console.log(err.name, ':', err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  // If we can't connect to the DB, the app won't work, may as well shut down the server, we will do it gracefully though
  // 0 stands for success and 1 for uncaught exception
  process.exit(1);
});

require('dotenv').config({ path: '../.env' });

const PORT = process.env.PORT || 3001;
const app = require('./app.js');

/**-------------------------
 *       CONNECTION
 *------------------------**/
db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🌍 Now listening on http://localhost:${PORT}`)
  );
});

/**-------------------------
 *      ASYNC ERRORS
 *------------------------**/
// For Async Errors that don't originate from Node or Express ~ Will catch promise rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  // If we can't connect to the DB, the app won't work, may as well shut down the server, we will do it gracefully though
  server.close(() => {
    // 0 stands for success and 1 for uncaught exception
    process.exit(1);
  });
});

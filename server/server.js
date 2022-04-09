const express = require('express');
const path = require('path');
const db = require('./config/connection.js');

require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // send index.html for any routes that don't exist
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Will catch any requests (Get, Post, etc...) to non-specified routes
app.all('*', (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server`);
});

db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🌍 Now listening on http://localhost:${PORT}`)
  );
});

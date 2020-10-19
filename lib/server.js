/**
 * Server
 * @module Server
 */
'use-strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fourOhFour = require('../middleware/404');
const fiveHundred = require('../middleware/500');

const router = require('../routes/api-v1');

/**
 * Middleware use
 */
const app = express();
app.use(express.json());
app.use(morgan('dev'));


app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, PUT, PATCH, POST, DELETE",
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

/**
 * 
 * Generic api module
 */
app.use(router);

/**
 * Error handler
 */
app.use('*', fourOhFour);
app.use(fiveHundred);

/**
 * Export server
 * to start server in another file required the server then
 * server.start()
 */
module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening ${PORT}`));
  },
};

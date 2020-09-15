/**
 * Server
 * @module Server
 */
'use-strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const data = require('../data/db.json');
const timeStamp = require('../middleware/timestamp');
const logger = require('../middleware/logger');
const fourOhFour = require('../middleware/404');
const fiveHundred = require('../middleware/500');

const productRouter = require('../routes/product');
const categoryRouter = require('../routes/categories');

/**
 * Middleware use
 */
const app = express();
app.use(express.json());
app.use(timeStamp);
app.use(logger);

/**
 * Product, Category router use
 * Product -> /products
 * Caategory -> /categories
 */
app.use('/', productRouter);
app.use('/', categoryRouter);

/**
 * Bad request
 * just for testing the 500 error
 */
app.get('/bad', badRequest);

function badRequest(req, res) {
  throw new Error('bad Request .... ');
}

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
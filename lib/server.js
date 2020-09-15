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


const app = express();
app.use(express.json());
app.use(timeStamp);
app.use(logger);

app.use('/', productRouter);
app.use('/', categoryRouter);

// Routes
app.get('/bad', badRequest);

function badRequest(req, res) {
  throw new Error('bad Request .... ');
}

app.use('*', fourOhFour);
app.use(fiveHundred);


module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening ${PORT}`));
  },
};
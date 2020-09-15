'use strict';

module.exports = (req, res, next) => {
  req.requestTime = 
    `${(new Date).toLocaleDateString()} ${(new Date).toLocaleTimeString()}`;
  next();
};
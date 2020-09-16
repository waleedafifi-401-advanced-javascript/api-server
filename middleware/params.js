'use strict';

module.exports = (req, res, next) => {
  let model = req.params.model;
  switch (model) {
  case 'products':
    req.model = require(`../lib/models/${model}/${model}.collection`);
    next();
    return;
  case 'categories':
    req.model = require(`../lib/models/${model}/${model}.collection`);
    next();
    return;
  default:
    next('Invalid Model');
    return;
  }
};
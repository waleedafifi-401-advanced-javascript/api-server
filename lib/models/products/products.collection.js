'use strict';

const Model = require('../model');
const schema = require('./products.schema');

/**
 * @class Product
 */
class Product extends Model {

  /**
   * @constructor Product
   */
  constructor() {
    super(schema);
  }
}

module.exports = new Product();
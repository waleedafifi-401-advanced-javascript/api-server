
'use strict';

const Model = require('../model');
const schema = require('./categories.schema');

/**
 * @class Category
 */
class Category extends Model {
  /**
   * @constructor Category
   */
  constructor() {
    super(schema);
  }
}

module.exports = new Category();
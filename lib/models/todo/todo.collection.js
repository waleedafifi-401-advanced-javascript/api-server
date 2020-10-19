'use strict';

const Model = require('../model');
const schema = require('./todo.schema');

/**
 * @class Product
 */
class ToDo extends Model {

  /**
   * @constructor Product
   */
  constructor() {
    super(schema);
  }
}

module.exports = new ToDo();
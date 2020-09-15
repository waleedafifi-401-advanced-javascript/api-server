/**
 * Category Schema
 * @module Category
 */
'use strict';

const mongoose = require('mongoose');

/**
 * Category Schema
 */
const category = mongoose.Schema({
  /**
   * @name {String, Required}
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * @dispay_name {String, Required}
   */
  display_name: {
    type: String,
    required: true,
  },
  /**
   * @description {String, Required}
   */
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('category', category);
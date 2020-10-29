/**
 * Product Schema
 * @module Product
 */
'use strict';

const mongoose = require('mongoose');

/**
 * Product Schema
 */
const product = mongoose.Schema({
  /**
   * @name {String, Required}
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * @display_name {String, Required}
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
  /**
   * @category {String, Required}
   */
  category: {
    type: String,
    required: true,
  },
    inStock: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('product', product);

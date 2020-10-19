/**
 * Product Schema
 * @module ToDo
 */
'use strict';

const mongoose = require('mongoose');

/**
 * Product Schema
 */
const todo = mongoose.Schema({
  /**
   * @name {String, Required}
   */
  text: {
    type: String,
    required: true,
  },
  /**
   * @assignee {String, Required}
   */
  assignee: {
    type: String,
    required: true,
  },
  /**
   * @difficulty {Number, Required}
   */
  difficulty: {
    type: Number,
    required: true,
    default: 1,
  },
  /**
   * @complete {Boolean, Required}
   */
  complete: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('todo', todo);
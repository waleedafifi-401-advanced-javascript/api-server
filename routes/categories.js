'use strict';

/**
 * express module
 * @const
 */
const express = require('express');
const categories = require('../lib/models/categories/categories.collection');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace categoryRouter
 */
const router = express.Router();

router.post('/categories', categoriesHandler);
router.get('/categories', getcategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.patch('/categories/:id', updateCategoryPatch);
router.delete('/categories/:id', deleteCategory);

/**************** Categories Api request ******************/

/**
 * This function comment is parsed by doctrine
 * @route POST /api/post/products
 * @function categoriesHandler
 * @returns {object} 201
 * @returns {Error}  default - Unexpected error
 */
function categoriesHandler(req, res, next) {
  categories.create(req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);

}

/**
 * This function comment is parsed by doctrine
 * @route GET /api/get/products
 * @function getcategories
 * @returns {object} 200 - array of products
 * @returns {Error}  default - Unexpected error
 */
function getcategories(req, res, next) {
  categories.read()
    .then(record => {
      res.status(200).json({
        count: record.length,
        resutl: record,
      });
    }).catch(next);
}

/**
 * This function comment is parsed by doctrine
 * @route GET /api/get/products
 * @function getCategoryById
 * @returns {object} 200 - product by id
 * @returns {Error}  default - Unexpected error
 */
function getCategoryById(req, res, next) {
  categories.read(req.params.id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);

}

/**
 * This function comment is parsed by doctrine
 * @route PUT /api/put/products
 * @function updateCategory
 * @returns {object} 201 - update product by id
 * @returns {Error}  default - Unexpected error
 */
function updateCategory(req, res, next) {
  let _id = req.params.id;
  categories.update(_id, req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

/**
 * This function comment is parsed by doctrine
 * @route PATCH /api/patch/products
 * @function updateCategoryPatch
 * @returns {object} 200 - update product by id using patch
 * @returns {Error}  default - Unexpected error
 */
function updateCategoryPatch(req, res, next) {
  let newRecord = {};
  let _id = req.params.id;
  let body = req.body;
  categories.read(_id)
    .then(record => {
      record.forEach(item => {
        newRecord = {
          name: body.name ? body.name : item.name,
          display_name: body.display_name ? body.display_name : item.display_name,
          description: body.description ? body.description : item.description,
          // id: req.params.id,
        };
      });
      categories.update(_id, newRecord)
        .then(record => {
          res.status(200).json(record);
        }).catch(next);
    }).catch(next);
}

/**
 * This function comment is parsed by doctrine
 * @route DELETE /api/delete/products
 * @function deleteCategory
 * @returns {object} 200 - return oobject deleeted
 * @returns {Error}  default - Unexpected error
 */
function deleteCategory(req, res, next) {
  let _id = req.params.id;
  categories.delete(_id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}
/******************* End of Categories Api request **********************/

module.exports = router;
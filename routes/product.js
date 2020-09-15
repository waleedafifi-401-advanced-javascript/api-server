'use strict';

/**
 * express module
 * @const
 */
const express = require('express');
const products = require('../lib/models/products/products.collection');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace productRouter
 */
const router = express.Router();

router.post('/products', productsHandler);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.patch('/products/:id', updateProductPatch);
router.delete('/products/:id', deleteProduct);

/**************** Products Api request ******************/

/**
 * This function comment is parsed by doctrine
 * @route POST /api/post/products
 * @function productsHandler
 * @returns {object} 201
 * @returns {Error}  default - Unexpected error
 */
function productsHandler(req, res, next) {
  products.create(req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

/**
 * This function comment is parsed by doctrine
 * @route GET /api/get/products
 * @function getProducts
 * @returns {object} 200 - array of products
 * @returns {Error}  default - Unexpected error
 */
function getProducts(req, res, next) {
  products.read()
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
 * @function getProductById
 * @returns {object} 200 - product by id
 * @returns {Error}  default - Unexpected error
 */
function getProductById(req, res, next) {
  products.read(req.params.id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

/**
 * This function comment is parsed by doctrine
 * @route PUT /api/put/products
 * @function updateProduct
 * @returns {object} 201 - update product by id
 * @returns {Error}  default - Unexpected error
 */
function updateProduct(req, res, next) {
  let _id = req.params.id;
  products.update(_id, req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

/**
 * This function comment is parsed by doctrine
 * @route PATCH /api/patch/products
 * @function updateProductPatch
 * @returns {object} 200 - update product by id using patch
 * @returns {Error}  default - Unexpected error
 */
function updateProductPatch(req, res, next) {
  let newRecord = {};
  let _id = req.params.id;
  let body = req.body;
  products.read(_id)
    .then(record => {
      record.forEach(item => {
        newRecord = {
          name: body.name ? body.name : item.name,
          display_name: body.display_name ? body.display_name : item.display_name,
          description: body.description ? body.description : item.description,
          category: body.category ? body.category : item.category,
          // id: req.params.id,
        };
      });
      products.update(_id, newRecord)
        .then(record => {
          res.status(200).json(record);
        }).catch(next);
    }).catch(next);
}

/**
 * This function comment is parsed by doctrine
 * @route DELETE /api/delete/products
 * @function deleteProduct
 * @returns {object} 200 - return oobject deleeted
 * @returns {Error}  default - Unexpected error
 */
function deleteProduct(req, res, next) {
  let _id = req.params.id;
  products.delete(_id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

/******************* End of Products Api request **********************/

module.exports = router;
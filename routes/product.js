'use strict';

const express = require('express');
const products = require('../lib/models/products/products.collection');

const router = express.Router();

router.post('/products', productsHandler);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.patch('/products/:id', updateProductPatch);
router.delete('/products/:id', deleteProduct);

/**************** Products Api request ******************/

function productsHandler(req, res, next) {
  products.create(req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

function getProducts(req, res, next) {
  products.read()
    .then(record => {
      res.status(200).json({
        count: record.length,
        resutl: record,
      });
    }).catch(next);
}

function getProductById(req, res, next) {
  products.read(req.params.id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

function updateProduct(req, res, next) {
  let _id = req.params.id;
  products.update(_id, req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

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

function deleteProduct(req, res, next) {
  let _id = req.params.id;
  products.delete(_id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

/******************* End of Products Api request **********************/

module.exports = router;
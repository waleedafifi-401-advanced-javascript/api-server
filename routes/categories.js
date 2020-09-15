'use strict';

const express = require('express');
const categories = require('../lib/models/categories/categories.collection');

const router = express.Router();

router.post('/categories', categoriesHandler);
router.get('/categories', getcategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.patch('/categories/:id', updateCategoryPatch);
router.delete('/categories/:id', deleteCategory);

/**************** Categories Api request ******************/

function categoriesHandler(req, res, next) {
  categories.create(req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);

}

function getcategories(req, res, next) {
  categories.read()
    .then(record => {
      res.status(200).json({
        count: record.length,
        resutl: record,
      });
    }).catch(next);
}

function getCategoryById(req, res, next) {
  categories.read(req.params.id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);

}

function updateCategory(req, res, next) {
  let _id = req.params.id;
  categories.update(_id, req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

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

function deleteCategory(req, res, next) {
  let _id = req.params.id;
  categories.delete(_id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}
/******************* End of Categories Api request **********************/

module.exports = router;
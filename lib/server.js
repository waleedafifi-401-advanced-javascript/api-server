'use-strict';

const express = require('express');
const data = require('../data/db.json');
const timeStamp = require('./timestamp');
const logger = require('./logger');
const fourOhFour = require('./404');
const fiveHundred = require('./500');

const app = express()
app.use(express.json());
app.use(timeStamp);
app.use(logger);

//Dummy data array
let productsArray = [];
let categoriesArray = [];

// Routes
app.post('/products', productsHandler);
app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.put('/products/:id', updateProduct);
app.patch('/products/:id', updateProductPatch);
app.delete('/products/:id', deleteProduct);

app.post('/categories', categoriesHandler);
app.get('/categories', getcategories);
app.get('/categories/:id', getCategoryById);
app.put('/categories/:id', updateCategory);
app.patch('/categories/:id', updateCategoryPatch);
app.delete('/categories/:id', deleteCategory);

app.get('/bad', badRequest);
/**************** Products Api request ******************/

function productsHandler(req, res) {
    let record = {
        name: req.body.name,
        display_name: req.body.display_name,
        description: req.body.description,
        category: req.body.category,
    };
    record.id = productsArray.length + 1;
    productsArray.push(record);
    res.status(200).json(record);
}

function getProducts(req, res) {
    let count = productsArray.length;
    res.status(200).json({count: count, resutl: productsArray});
}

function getProductById(req, res) {
    let product = [];
    productsArray.forEach(item => {
        if (item.id == req.params.id) {
            product.push(item);
        }
    });
    res.status(200).json(product);
}

function updateProduct(req, res) {

    let newRecord = {};

    productsArray.forEach((val, index) => {

        if (val.id == req.params.id) {
            newRecord = {
                name: req.body.name,
                display_name: req.body.display_name,
                description: req.body.description,
                category: req.body.category,
                id: req.params.id,
            };
            productsArray.splice(index, 1, newRecord);
        }

    });

    res.status(200).json(newRecord);
}

function updateProductPatch(req, res) {

    let newRecord = {};

    productsArray.forEach((val, index) => {
        if (val.id == req.params.id) {
            newRecord = {
                name: req.body.name ? req.body.name : val.name,
                display_name: req.body.display_name ? req.body.display_name : val.display_name,
                description: req.body.description ? req.body.description : val.description,
                category: req.body.category ? req.body.category : val.category,
                id: req.params.id,
            };
            productsArray.splice(index, 1, newRecord);
        };
    });

    res.status(200).json(newRecord);
}

function deleteProduct(req, res) {
    productsArray.forEach((val, index) => {
        if (val.id == req.params.id) {
            productsArray.splice(index, 1);
        }
    });
    res.status(200).json(productsArray);
}

/******************* End of Products Api request **********************/


/**************** Categories Api request ******************/

function categoriesHandler(req, res) {
    let record = {
        name: req.body.name,
        display_name: req.body.display_name,
        description: req.body.description,
        category: req.body.category,
    };
    record.id = categoriesArray.length + 1;
    categoriesArray.push(record);
    res.status(200).json(record);
}

function getcategories(req, res) {
    let count = categoriesArray.length;
    res.status(200).json({count: count, resutl: categoriesArray});
}

function getCategoryById(req, res) {
    let Category = [];
    categoriesArray.forEach(item => {
        if (item.id == req.params.id) {
            Category.push(item);
        }
    });
    res.status(200).json(Category);
}

function updateCategory(req, res) {

    let newRecord = {};

    categoriesArray.forEach((val, index) => {

        if (val.id == req.params.id) {
            newRecord = {
                name: req.body.name,
                display_name: req.body.display_name,
                description: req.body.description,
                category: req.body.category,
                id: req.params.id,
            };
            categoriesArray.splice(index, 1, newRecord);
        }

    });

    res.status(200).json(newRecord);
}

function updateCategoryPatch(req, res) {

    let newRecord = {};

    categoriesArray.forEach((val, index) => {
        if (val.id == req.params.id) {
            newRecord = {
                name: req.body.name ? req.body.name : val.name,
                display_name: req.body.display_name ? req.body.display_name : val.display_name,
                description: req.body.description ? req.body.description : val.description,
                category: req.body.category ? req.body.category : val.category,
                id: req.params.id,
            };
            categoriesArray.splice(index, 1, newRecord);
        };
    });

    res.status(200).json(newRecord);
}

function deleteCategory(req, res) {
    categoriesArray.forEach((val, index) => {
        if (val.id == req.params.id) {
            categoriesArray.splice(index, 1);
        }
    });
    res.status(200).json(categoriesArray);
}

function badRequest(req, res) {
    throw new Error("bad Request .... ");
}
/******************* End of Categories Api request **********************/


app.use('*', fourOhFour);
app.use(fiveHundred);


module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`listening ${PORT}`));
    },
};
'use-strict';

const express = require('express');
const data = require('../data/db.json');

const app = express()
app.use(express.json());

app.get('/', (req, res, next) => {
    let categoriesCount = data.categories.length;
    let productdCount = data.products.length;
    let results = data;
    res.json({
        categoriesCount,
        productdCount,
        results
    });

});


// Categories API Routes 
app.get('/categories', (req, res, next) => {
    let count = data.categories.length;
    let results = data.categories;
    res.json({
        count,
        results
    });
});

// Products API Routes 
app.get('/products', (req, res, next) => {
    let count = data.products.length;
    let results = data.products;
    res.json({
        count,
        results
    });
});

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`listening ${PORT}`));
    },
};
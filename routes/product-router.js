const express = require('express');

const ProductModel = require('../models/product-model.js');


const router = express.Router();


router.get('/products', (req, res, next) => {
    // find the products in the database
    ProductModel.find((err, allProducts) => {
        // if there's a database error...
        if (err) {
            // log the error message
            console.log('OMG error');
            console.log(err);
            // return to avoid showing the view
            return;
              // early return instead of "else"
        }

        // send the results to the view
        res.locals.listOfProducts = allProducts;

        res.render('product-views/product-list.ejs');
    }); // close ProductModel.find( ...
}); // close GET /products


module.exports = router;

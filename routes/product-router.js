const express = require('express');

const ProductModel = require('../models/product-model.js');


const router = express.Router();


router.get('/products', (req, res, next) => {
    // find the products in the database
    ProductModel.find((err, allProducts) => {
        // if there's a database error...
        if (err) {
            // skip to the error handler middleware
            next(err);
            // return to avoid showing the view
            return;
              // early return instead of "else"
        }

        // send the results to the view
        res.locals.listOfProducts = allProducts;

        res.render('product-views/product-list.ejs');
    }); // close ProductModel.find( ...
}); // close GET /products


// STEP #1 of the product create submission process
router.get('/products/new', (req, res, next) => {
    res.render('product-views/product-form.ejs');
});

// STEP #2 of the product create submission process
// <form method="post" action="/products">
router.post('/products', (req, res, next) => {
    // create a new product object
    const theProduct = new ProductModel({
        name: req.body.productName,
        price: req.body.productPrice,
        imageUrl: req.body.productImageUrl,
        description: req.body.productDescription
    }); //  |                          |
        // from SCHEMA            from INPUT NAMES

    // save that product to the database
    theProduct.save((err) => {
        // if there's a database error...
        if (err) {
            // skip to the error handler middleware
            next(err);
            // return to avoid showing the view
            return;
              // early return instead of "else"
        }

        // STEP #3 redirect
        // ALWAYS redirect after a successful to POST to avoid resubmitting
        res.redirect('/products');
          // You can only redirect to a URL
    });
}); // close POST /products


router.get('/products/:prodId', (req, res, next) => {
    //      req.params.prodId
    // <a href="/products/9999">
    // NEW URL

    //                 req.query.prodId
    // <a href="/product-details?prodId=9999">
    // OLD URL

    // "findById()" will get one result from the DB (or null)
    ProductModel.findById(
      req.params.prodId,

      (err, productFromDb) => {
          if (err) {
              // skip straight to the error middleware if there's a DB error
              next(err);
              return;
          }

          res.locals.productInfo = productFromDb;

          res.render('product-views/product-details.ejs');
      }
    );
}); // close GET "/product-details"



module.exports = router;

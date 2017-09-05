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
        // if there's a validation error...
        if (err && theProduct.errors) {
            // send the error messages to the view
            res.locals.errorMessages = theProduct.errors;

            // display the form again with the errors
            res.render('product-views/product-form.ejs');
            return;
        }

        // if there's a database error...
        if (err && !theProduct.errors) {
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
      // get the ID from the URL placeholder ":prodId"
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
}); // close GET /products/:prodId


// STEP #1: show the edit form
router.get('/products/:prodId/edit', (req, res, next) => {
    // Because we want to prepopulate the form fields,
    // we need to get the product's information from the database.
    ProductModel.findById(
        // get the ID from the URL placeholder ":prodId"
        req.params.prodId,

        (err, productFromDb) => {
            if (err) {
                // skip straight to the error middleware if there's a DB error
                next(err);
                return;
            }

            res.locals.productInfo = productFromDb;

            res.render('product-views/edit-product.ejs');
        }
    );
}); // close GET /products/:prodId/edit

// STEP #2: receive the form submission and save
router.post('/products/:prodId', (req, res, next) => {
    // PROTIP: Use "findById" and "save" for updates to save with validations

    // find the product to update it
    ProductModel.findById(
      req.params.prodId,

      (err, productFromDb) => {
          if (err) {
              next(err);
              return;
          }

          // update the product's fields to the ones from the form
          productFromDb.name        = req.body.productName;
          productFromDb.price       = req.body.productPrice;
          productFromDb.imageUrl    = req.body.productImageUrl;
          productFromDb.description = req.body.productDescription;
          //              |                           |
          //          SCHEMA fields                INPUT names

          // save the updates
          productFromDb.save((err) => {
              if (err) {
                  next(err);
                  return;
              }

              // STEP #3: redirect
              res.redirect('/products');

              // to redirect to the details page:
              // res.redirect('/products' + productFromDb._id);
          });
      }
    ); // close ProductModel.findById( ...
}); // close POST /products/:prodId


router.post('/products/:prodId/delete', (req, res, next) => {
    ProductModel.findByIdAndRemove(
      req.params.prodId,

      (err, productInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/products');
      }
    );
}); // close POST /products/:prodId/delete


module.exports = router;

const express = require('express');

const ProductModel = require('../models/product-model.js');


const router = express.Router();


router.get('/products/value', (req, res, next) => {
    ProductModel
      .find()
      .sort({ price: 'ascending' })
      .limit(10)

      // "exec" executes a query with multiple steps
      .exec((err, valueProducts) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.listOfProducts = valueProducts;

          res.render('variations-views/value-products.ejs');
      });
});


router.get('/products/luxury', (req, res, next) => {
    ProductModel
      .find()
      .sort({ price: 'descending' })
      .limit(10)

      // "exec" executes a query with multiple steps
      .exec((err, luxuryProducts) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.listOfProducts = luxuryProducts;

          res.render('variations-views/luxury-products.ejs');
      });
});


module.exports = router;

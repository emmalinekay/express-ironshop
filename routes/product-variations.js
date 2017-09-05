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


router.get('/products/search', (req, res, next) => {
    res.render('variations-views/product-search.ejs');
});

router.get('/products/search-results', (req, res, next) => {
    const mySearchRegex = new RegExp(req.query.searchTerm, 'i');
                                                 //         |
    ProductModel.find(                           // ignore case
      { name: mySearchRegex },
      // |
      // field from the schema to search
      // (check the model)

      (err, searchResults) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.lastSearch = req.query.searchTerm;
          res.locals.listOfResults = searchResults;
          res.render('variations-views/results.ejs');
      }
    );
}); // close GET /products/search-results


module.exports = router;

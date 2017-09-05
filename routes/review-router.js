const express = require('express');

const ProductModel = require('../models/product-model.js');
const ReviewModel = require('../models/review-model.js');


const router = express.Router();

        //  /products/ 9999  /reviews/new
router.get('/products/:prodId/reviews/new', (req, res, next) => {
    ProductModel.findById(
      req.params.prodId,

      (err, productFromDb) => {
          if (err) {
              next(err);
              return;
          }

          // Send the product info to show it as the user makes their review
          res.locals.productInfo = productFromDb;

          res.render('review-views/review-form.ejs');
      }
    );
}); // close GET /products/:prodId/reviews

// <form method="post" action="/products/<%= productInfo._id %>/reviews">
router.post('/products/:prodId/reviews', (req, res, next) => {
    // retrieve the product from the database
    // (saving a review is really updating a product)
    ProductModel.findById(
      req.params.prodId,

      (err, productFromDb) => {
          if (err) {
              next(err);
              return;
          }

          // create our new review object from the form data
          const theReview = new ReviewModel({
              content: req.body.reviewContent,
              stars: req.body.reviewStars,
              author: req.body.reviewAuthor
          }); // |                   |
              // SCHEMA fields     INPUT names

          // add the new review to the product's "reviews" array
          productFromDb.reviews.push( theReview );

          // save the product updates to the database
          productFromDb.save((err) => {
              if (err) {
                  next(err);
                  return;
              }

              // redirect to the product details page
              res.redirect('/products/' + productFromDb._id);
          });
      }
    ); // close ProductModel.findById( ...
}); // close POST /products/:prodId/reviews


module.exports = router;

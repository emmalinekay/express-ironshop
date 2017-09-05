const mongoose = require('mongoose');

const ReviewModel = require('./review-model.js');


const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    description: { type: String },

    // Products have an array of reviews with all their information
    // (ReviewModel.schema let's us access the structure of Review documents)
    reviews: [ ReviewModel.schema ]
});


const ProductModel = mongoose.model('Product', productSchema);
                  //      model name 'Product'
                  //                     |
                  // collection name 'products'

module.exports = ProductModel;

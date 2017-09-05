const mongoose = require('mongoose');

const ReviewModel = require('./review-model.js');


const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Please provide the product name']
    },
    price: {
      type: Number,
      required: [true, 'How much will your product cost?'],
      min: [0, "Your price can't be lower than $0"],
      max: [300, "Your price can't be over $300"]
    },
    imageUrl: {
      type: String,
      required: [true, 'Your product needs an image.']
    },
    description: {
      type: String,
      maxlength: [200, "Your description is over the 200 character limit"]
    },

    // Products have an array of reviews with all their information
    // (ReviewModel.schema let's us access the structure of Review documents)
    reviews: [ ReviewModel.schema ]
});


const ProductModel = mongoose.model('Product', productSchema);
                  //      model name 'Product'
                  //                     |
                  // collection name 'products'

module.exports = ProductModel;

const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    description: { type: String }
});


const ProductModel = mongoose.model('Product', productSchema);
                  //      model name 'Product'
                  //                     |
                  // collection name 'products'

module.exports = ProductModel;

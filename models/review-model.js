const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    // the review's text  e.g. "worst product ever. 0/5"
    content: { type: String },

    // the star rating of the review (out of 5)
    stars: { type: Number },

    // name or email of the person who wrote the review
    author: { type: String }

    // IF we wanted to save reviews in their own collection,
    // we would need to save the product ID
    // product: { type: Schema.Types.ObjectId }
});


const ReviewModel = mongoose.model('Review', reviewSchema);


module.exports = ReviewModel;

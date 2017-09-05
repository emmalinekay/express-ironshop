const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    // the review's text  e.g. "worst product ever. 0/5"
    content: { type: String },

    // the star rating of the review (out of 5)
    stars: {
      type: Number,
      required: [true, 'Please rate the product'],
      min: [1, 'The minimum rating is 1'],
      max: [5, "Your rating can't be more than 5"]
    },

    // name or email of the person who wrote the review
    author: {
      type: String,
      required: [true, 'Please provide your email for our records'],
      // shortest email: "a@a.co"
      minlength: [6, 'Your email is too short. It should be at least 6 characters long.'],
      // regular expression for "stuff@stuff.stuff"
      match: [/.+@.+\..+/, "Your email doesn't have the right structure name@example.com"]
    }

    // IF we wanted to save reviews in their own collection,
    // we would need to save the product ID
    // product: { type: Schema.Types.ObjectId }
});


const ReviewModel = mongoose.model('Review', reviewSchema);


module.exports = ReviewModel;

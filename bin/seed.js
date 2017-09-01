const mongoose = require('mongoose');

const ProductModel = require('../models/product-model.js');


mongoose.connect('mongodb://localhost/ironshop');


const productArray = [
    {
      name: 'Bean Taco',
      price: 5,
      imageUrl: 'https://media.giphy.com/media/EsDCYBUQM0KlO/giphy.gif',
      description: 'Mmmm tacos'
    },
    {
      name: 'Gold Pizza',
      price: 999,
      imageUrl: 'https://media.giphy.com/media/xUA7b5b2l0Vx3M0G40/giphy.gif',
      description: 'It\'s gold!'
    },
    {
      name: 'Awesome TV',
      price: 400,
      imageUrl: 'https://media.giphy.com/media/XhT868oxljs88/giphy.gif',
      description: 'Vintage'
    },
    {
      name: 'Hot Dog',
      price: 3,
      imageUrl: 'https://media.giphy.com/media/kZzY6eKKPdIjK/giphy.gif',
      description: 'With everything'
    },
    {
      name: 'Ketchup',
      price: 10,
      imageUrl: 'https://media.giphy.com/media/k9uW1jZOuGeIg/giphy.gif',
      description: 'Quality'
    }
];

ProductModel.create(
  // 1st argument -> array of products to save
  productArray,

  // 2nd argument -> callback
  (err, productsAfterSave) => {
      if (err) {
          console.log('Create error 😅');
          console.log(err);
          return;
      }

      productsAfterSave.forEach((oneProduct) => {
          console.log('New Product ---> ' + oneProduct.name);
      });
  }
); // close ProductModel.create( ...

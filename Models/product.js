const mongoose = require('mongoose'); 

// Define the Product schema
const productSchema = new mongoose.Schema({
  productName: {
    type : String ,
    required : true
  },
  productPrice: Number,
  productDate: Date,
});

// Create the model and assign it to the `Product` variable
const Product = mongoose.model('Product', productSchema);
module.exports = Product


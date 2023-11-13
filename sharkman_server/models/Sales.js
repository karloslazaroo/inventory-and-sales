const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantitySold: {
    type: Number,
    required: true
  },
  saleDate: {
    type: Date,
    default: Date.now
  }
});

const Sales = mongoose.model('Sales', saleSchema);

module.exports = Sales;



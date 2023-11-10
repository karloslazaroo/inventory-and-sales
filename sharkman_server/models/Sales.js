const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.TypesObjectId,
        ref: 'Product'
    },
    quantitySold: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Sales', saleSchema);


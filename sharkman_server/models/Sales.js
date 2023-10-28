const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.TypesObjectId,
        ref: 'Inventory'
    },
    quantitySold: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Sales', saleSchema);


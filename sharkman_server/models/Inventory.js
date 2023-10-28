const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
})

module.exports = mongoose.model('Inventory', inventySchema);




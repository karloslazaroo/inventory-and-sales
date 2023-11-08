const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    product_sku: String,
    product_name: String,
    quantity: Number,
    cost_price: Number,
    sales_price: Number
})

module.exports = mongoose.model('Inventory', inventorySchema);




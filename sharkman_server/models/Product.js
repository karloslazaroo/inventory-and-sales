const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_sku: {
        type:String,
        required: true
    },
    product_name: {    
        type:String,
        required: true
    },
    quantity: {     
        type: Number,
        required: true
    },
    cost_price: {     
        type: Number,
        required: true
    },
    sales_price: {     
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Product', productSchema);




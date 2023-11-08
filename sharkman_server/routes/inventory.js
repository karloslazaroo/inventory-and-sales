const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory')

// get all inventory
router.get('/', async (req, res) =>{
    try {
        const inventory = await Inventory.find();
        res.json(inventory);

    } catch (err) {
        res.json({message: err.message});

    }
});

//add new inventory item
router.post('/', async (req, res) =>{
    const inventory = new Inventory({
        product_sku: req.body.product_id,
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        cost_price: req.body.cost_price,
        sales_price: req.body.sales_price
    });

    try {
        const savedInventory = await inventory.save();
        res.json(savedInventory);
    } catch (err) {
        res.json({message: err.message});
    }
});

module.exports = router;

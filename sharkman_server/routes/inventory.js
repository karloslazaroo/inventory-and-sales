const express = require('express');
const router = express.Router();
const Inventory = require('..models/Inventory');

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
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    });

    try {
        const savedInventory = await inventory.save();
        res.json(savedInventory);
    } catch (err) {
        res.json({message: err.message});
    }
});

module.exports = router;

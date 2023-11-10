const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales')


router.get('/', async (req, res) =>{
   res.send('Hello World')
   
    // try {
    //     const product = await Product.find();
    //     res.json(product);

    // } catch (err) {
    //     res.json({message: err.message});

    // }
});

module.exports = router;
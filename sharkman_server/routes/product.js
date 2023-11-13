const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

// get all products
router.get('/', async (req, res) =>{
    try {
        const product = await Product.find();
        res.json(product);

    } catch (err) {
        res.json({message: err.message});

    }
});

//add new product
router.post('/', async (req, res) =>{
    const product = new Product({
        product_sku: req.body.product_sku,
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        cost_price: req.body.cost_price,
        sales_price: req.body.sales_price
    });

    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.json({message: err.message});
    }
});

//delete product
router.delete('/:id', getProduct, async (req,res) => {
    try {
        await res.product.deleteOne()
        res.json({message: 'Deleted Product'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//update product
router.patch('/:id', getProduct, async (req, res)=>{
    if (req.body.product_sku != null) {
        res.product.product_sku = req.body.product_sku
    }
    if (req.body.product_name != null) {
        res.product.product_name = req.body.product_name
    }
    if (req.body.quantity != null) {
        res.product.quantity = req.body.quantity
    }
    if (req.body.cost_price != null) {
        res.product.cost_price = req.body.cost_price
    }
    if (req.body.sales_price != null) {
        res.product.sales_price = req.body.sales_price
    }
    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


async function getProduct (req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product'})
        }
    } catch (err) {
        return res.status(500).jsonn ({message: err.message})

    }

    res.product = product
    next()

}

module.exports = router;

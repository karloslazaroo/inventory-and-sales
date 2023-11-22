const express = require('express');
const router = express.Router();
const Sale = require('../models/Sales');
const Product = require('../models/Product'); // Assuming you have a Product model




router.get('/', async (req, res) => {
    try {
      const sales = await Sale.find().populate('products.productId');
      res.json(sales);
    } catch (error) {
      console.error('Error fetching sales:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Route to make a sale
// router.post('/', async (req, res) => {
//   try {
//     const { customerName, productId, quantitySold } = req.body;

//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Check if there is enough quantity to sell
//     if (quantitySold > product.quantity) {
//       return res.status(400).json({ message: 'Not enough quantity to sell' });
//     }

//     // Create a new sale
//     const sale = new Sale({
//       customerName,
//       productId,
//       quantitySold
//     });

//     // Save the sale to the database
//     await sale.save();

//     // Update the product quantity
//     product.quantity -= quantitySold;
//     await product.save();

//     res.status(201).json({ message: 'Sale made successfully', sale });
//   } catch (error) {
//     console.error('Error making sale:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

router.post("/", async (req, res) =>{
  try {
  const customerName = req.body.customerName;
  const productId = req.body.productId;
  const quantitySold = req.body.quantitySold;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if there is enough quantity to sell
  if (quantitySold > product.quantity) {
    return res.status(400).json({ message: 'Not enough quantity to sell' });
  }

  // Create a new sale
  const sale = new Sale({
    customerName,
    productId,
    quantitySold
  });

  // Save the sale to the database
  await sale.save();

  // Update the product quantity
  product.quantity -= quantitySold;
  await product.save();

  res.status(201).json({ message: 'Sale made successfully', sale });
} catch (error) {
  console.error('Error making sale:', error);
  res.status(500).json({ message: 'Internal Server Error' });
}
})

module.exports = router;

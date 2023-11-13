import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../components/MainLayout';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantitySold, setQuantitySold] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:4000/product')
      .then(response => {
        setProducts(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleSale = () => {
    if (selectedProduct && quantitySold > 0 && quantitySold <= selectedProduct.quantity) {
      const updatedProduct = {
        ...selectedProduct,
        quantity: selectedProduct.quantity - quantitySold
      };

      axios.patch(`http://localhost:4000/product/${selectedProduct._id}`, updatedProduct)
        .then(response => {
          console.log('Sale made:', response.data);
          setProducts(products.map(product =>
            product._id === selectedProduct._id ? response.data : product
          ));
          setSelectedProduct(null);
        })
        .catch(error => {
          console.error('Error making sale:', error);
        });
    }
  };

  return (
    <div>
      <MainLayout>
      <h1>Sales</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <strong>Product SKU:</strong> {product.product_sku}
            <strong>Name:</strong> {product.product_name}, 
            <strong> Cost Price</strong> {product.cost_price}, 
            <strong> Sales Price:</strong> ${product.sales_price}, 
            <strong> Quantity:</strong> {product.quantity}
            <button onClick={() => setSelectedProduct(product)}>Select</button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div>
          <h2>Sell {selectedProduct.name}</h2>
          <p>Available Quantity: {selectedProduct.quantity}</p>
          <label>Quantity to Sell:</label>
          <input
            type="number"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            min="1"
            max={selectedProduct.quantity}
          />
          <button onClick={handleSale}>Make Sale</button>
        </div>
      )}
      </MainLayout>
    </div>
  );
};

export default Sales;

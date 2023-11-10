import React, { useState, useEffect } from 'react'
import MainLayout from '../../components/MainLayout'
import axios from 'axios';

function Product() {

    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      console.log("Fetching products...")
      axios.get('http://localhost:5000/product')
        .then(response => {
          setProducts(response.data.reverse());
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }, []);

    const addProductToList = (newProduct) => {
      setProducts([newProduct, ...products]); // Insert new product at the beginning
    };

   
      const [formData, setFormData] = useState({
        product_sku: '',
        product_name: '',
        cost_price: '',
        sales_price: '',
        quantity: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/product', formData)
    .then(response => {
      console.log('Product added:', response.data);
      setProducts([response.data, ...products ]);
      // Optionally, update the product list with the new product
    })
    .catch(error => {
      console.error('Error adding product:', error);
    });
      };

      const handleDelete = (productId) => {
        axios.delete(`http://localhost:5000/product/${productId}`)
          .then(response => {
            console.log('Product deleted:', response.data);
            setProducts(products.filter(product => product._id !== productId));
          })
          .catch(error => {
            console.error('Error deleting product:', error);
          });
      };
    

  return (
    <div>
      <MainLayout>

<h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>SKU:</label>
          <input type="text" name="product_sku" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Product Name:</label>
          <input type="text" name="product_name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Cost Price:</label>
          <input type="text" name="cost_price" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Sales Price:</label>
          <input type="number" name="sales_price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <strong>SKU:</strong> {product.product_sku}, 
            <strong>Name:</strong> {product.product_name}, 
            <strong> Cost Price:</strong> ₱{product.cost_price}, 
            <strong> Sales Price:</strong> ₱{product.sales_price}, 
            <strong> Quantity:</strong> {product.quantity}
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    

      </MainLayout>
    </div>
  )
}

export default Product

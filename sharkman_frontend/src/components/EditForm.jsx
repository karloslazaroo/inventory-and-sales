import React, { useState } from 'react';

const EditForm = ({ product, onUpdate }) => {
  const [formData, setFormData] = useState({
    product_sku: product.product_sku,
    product_name: product.product_name,
    cost_price: product.cost_price,
    sales_price: product.sales_price,
    quantity: product.quantity
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Product SKU</label>
          <input type="text" name="product_sku" value={formData.product_sku} onChange={handleChange} required />
        </div>
        <div>
          <label>Product Name:</label>
          <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Cost Price</label>
          <input type="text" name="cost_price" value={formData.cost_price} onChange={handleChange} required />
        </div>
        <div>
          <label>Sales Price:</label>
          <input type="number" name="sales_price" value={formData.sales_price} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditForm;
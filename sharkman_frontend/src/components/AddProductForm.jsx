import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import Modal from 'react-modal';
  

const AddProductForm = ({ addProductToList, closeModal }) => {
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

    axios.post('http://localhost:4000/product', formData)
      .then(response => {
        console.log('Product added:', response.data);
        addProductToList(response.data);
        setFormData({
            product_sku: '',
            product_name: '',
            cost_price: '',
            sales_price: '',
            quantity: ''
        });
        closeModal();
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };


  return (
    <div>

        
           <Modal
      isOpen={true}  // Set to true to ensure the modal is open
      onRequestClose={closeModal}
      contentLabel="Add Product Modal"
    >
        

<h2>Add Product</h2>
       <Card className="mt-6 w-96" color="transparent" shadow={false} >
          <Typography variant="h4" color="blue-gray">
            Add Product
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                SKU
              </Typography>
              <Input
                variant="outlined"
                label="Product SKU"
                type="text"
                name="product_sku"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Name
              </Typography>
              <Input
                variant="outlined"
                label="Product Name"
                type="text"
                name="product_name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Quantity
              </Typography>
              <Input
                variant="outlined"
                label="Product Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Sales Price
              </Typography>
              <Input
                variant="outlined"
                label="Pesos"
                type="number"
                name="sales_price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Cost Price
              </Typography>
              <Input
                variant="outlined"
                label="Pesos"
                type="text"
                name="cost_price"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <Button className="mt-6" fullWidth type="submit">
              Add Product
            </Button>
          </form>
        </Card>
    




        </Modal>

    </div>
  );
};

export default AddProductForm;
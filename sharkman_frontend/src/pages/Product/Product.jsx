import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import axios from "axios";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import AddProductForm from "../../components/AddProductForm";
import Modal from 'react-modal'; // Import the Modal component
import EditForm from "../../components/EditForm";


function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Fetching products...");
    axios
      .get("http://localhost:4000/api/product")
      .then((response) => {
        setProducts(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addProductToList = (newProduct) => {
    setProducts([newProduct, ...products]); // Insert new product at the beginning
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const [formData, setFormData] = useState({
    product_sku: "",
    product_name: "",
    cost_price: "",
    sales_price: "",
    quantity: "",
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post("http://localhost:5000/product", formData)
  //     .then((response) => {
  //       console.log("Product added:", response.data);
  //       setProducts([response.data, ...products]);
  //       setFormData({
  //         name: "",
  //         description: "",
  //         price: "",
  //         quantity: "",
  //       });
  //       // Optionally, update the product list with the new product
  //     })
  //     .catch((error) => {
  //       console.error("Error adding product:", error);
  //     });
  // };

  const handleUpdate = (updatedProduct) => {
    axios.put(`http://localhost:4000/api/product/${selectedProduct._id}`, updatedProduct)
      .then(response => {
        console.log('Product updated:', response.data);
        setProducts(products.map(product => 
          product._id === selectedProduct._id ? response.data : product
        ));
        setSelectedProduct(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:4000/api/product/${productId}`)
      .then((response) => {
        console.log("Product deleted:", response.data);
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

//   const modal = new HSOverlay(document.querySelector('#modal'));
//   const openBtn = document.querySelector('#open-btn');

// openBtn.addEventListener('click', () => {
//   modal.open();
// });

  return (
    <div>
      <MainLayout>
   

        <h1>Product List</h1>
        <button type="button" onClick={openModal} class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-focus-management-modal">
  Add Product
</button>
        

      {/* Modal for AddProductForm */}
      <Modal
        className=""
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product Modal"
      >
        <h2>Add Product</h2>
        <AddProductForm addProductToList={addProductToList} closeModal={closeModal} />
      </Modal>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <strong>SKU:</strong> {product.product_sku},<strong>Name:</strong>{" "}
              {product.product_name},<strong> Cost Price:</strong> ₱
              {product.cost_price},<strong> Sales Price:</strong> ₱
              {product.sales_price},<strong> Quantity:</strong>{" "}
              {product.quantity}
              <button onClick={() => handleDelete(product._id)}>Delete</button>
              <button onClick={() => handleEdit(product)}>Edit</button>
            {selectedProduct && selectedProduct._id === product._id && (
              <EditForm product={selectedProduct} onUpdate={handleUpdate} />
            )}
            </li>
          ))}
        </ul>

        



     
      </MainLayout>
    </div>
  );
}

export default Product;

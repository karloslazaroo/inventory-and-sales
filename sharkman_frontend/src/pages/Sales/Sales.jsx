import React, { useState, useEffect } from "react";
import axios from "axios";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantitySold, setQuantitySold] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:4000/api/product")
      .then((response) => {
        setProducts(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios
      .get("http://localhost:4000/api/sales")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectProduct = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
  };

  const handleSelect = () => {
    if (!selectedProductId) {
      alert("Please select a product.");
      return;
    }

    const product = products.find((p) => p._id === selectedProductId);
    if (!selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, product]);
      setQuantitySold({ ...quantitySold, [product._id]: 1 });
      setSelectedProductId("");
    }
  };

  const handleDeselect = (product) => {
    const updatedSelectedProducts = selectedProducts.filter(
      (p) => p._id !== product._id
    );
    const updatedQuantitySold = { ...quantitySold };
    delete updatedQuantitySold[product._id];

    setSelectedProducts(updatedSelectedProducts);
    setQuantitySold(updatedQuantitySold);
  };

  const handleQuantityChange = (product, newQuantity) => {
    setQuantitySold({ ...quantitySold, [product._id]: newQuantity });
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleSale = async () => {
    try {
      // Validate that at least one product is selected
      if (selectedProducts.length === 0) {
        alert("Please select at least one product for the sale.");
        return;
      }

      //prepare the sale data
      const saleData = {
        customerName,
        products: selectedProducts.map((product) => ({
          productId: product._id,
          quantitySold: quantitySold[product._id],
        })),
      };

      // Make a POST request to create the sale on the server
      const response = await axios.post(
        "http://localhost:4000/api/sales",
        saleData
      );
      console.log("Sale made successfully:", response.data);

      // Make a sale for each selected product
      const salesPromises = selectedProducts.map(async (product) => {
        const productId = product._id;
        const quantityToSell = quantitySold[productId];

        if (quantityToSell > 0 && quantityToSell <= product.quantity) {
          const updatedProduct = {
            ...product,
            quantity: product.quantity - quantityToSell,
          };

          await axios.patch(
            `http://localhost:4000/api/product/${productId}`,
            updatedProduct
          );

          setProducts((prevProducts) =>
            prevProducts.map((p) => (p._id === productId ? updatedProduct : p))
          );
        }
      });

      // Wait for all sales to complete before proceeding
      Promise.all(salesPromises).then(() => {
        // Clear form after successful sale
        setSelectedProducts([]);
        setQuantitySold({});
        setCustomerName("");
      });
    } catch (error) {
      console.error("Error making sale:", error);
      alert("Error making sale. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sales</h1>

      <form>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={handleCustomerNameChange}
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label>Select Product:</label>
          <select value={selectedProductId} onChange={handleSelectProduct}>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.product_name} - ${product.sales_price}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleSelect}>
            Add to Sale
          </button>
        </div>

        <ul>
          {selectedProducts.map((product) => (
            <li key={product._id}>
              <strong>Product SKU:</strong> {product.product_sku},
              <strong>Product Name:</strong> {product.product_name},
              <strong> Cost Price</strong> {product.cost_price},
              <strong> Sales Price:</strong> ${product.sales_price},
              <strong> Quantity:</strong> {product.quantity}
              <div>
                <button onClick={() => handleDeselect(product)}>Remove</button>
                <input
                  type="number"
                  value={quantitySold[product._id]}
                  onChange={(e) =>
                    handleQuantityChange(product, parseInt(e.target.value, 10))
                  }
                  min="1"
                  max={product.quantity}
                />
              </div>
            </li>
          ))}
        </ul>

        {selectedProducts.length > 0 && (
          <div>
            <h2>Sale Summary</h2>
            <ul>
              {selectedProducts.map((product) => (
                <li key={product._id}>
                  <strong>{product.name}:</strong> {quantitySold[product._id]}{" "}
                  units
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleSale}>
              Complete Sale
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Sales;

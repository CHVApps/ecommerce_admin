import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeleteProduct.css";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-backend-lv9n.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((productId) => productId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // ✅ Handle delete action (Fixed)
const handleDelete = async () => {
  if (selectedProducts.length === 0) {
      alert("Please select at least one product to delete.");
      return;
  }

  try {
      await Promise.all(
          selectedProducts.map(async (id) => {
              console.log(`🗑️ Deleting product ID: ${id}`);
              const response = await axios.delete(`https://ecommerce-backend-lv9n.onrender.com/api/products/${id}`);

              if (response.status !== 200) {
                  throw new Error("Delete failed");
              }
          })
      );

      alert("✅ Selected products deleted successfully!");
      setProducts((prevProducts) => prevProducts.filter((product) => !selectedProducts.includes(product.id)));
      setSelectedProducts([]);
  } catch (error) {
      console.error("❌ Error deleting products:", error);
      alert(error.response?.data?.error || "❌ Failed to delete products.");
  }
};


  return (
    <div className="delete-product-container">
      <h2>Delete Product</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Our Price</th>
            <th>Discount</th>
            <th>Final Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </td>
              <td>{product.product_name}</td>
              <td>₹{product.original_price}</td>
              <td>₹{product.our_price}</td>
              <td>{product.discount}%</td>
              <td>₹{product.final_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-delete" onClick={handleDelete}>
        🗑️ Delete Selected Products
      </button>
    </div>
  );
};

export default DeleteProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProducts.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-backend-zssq.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="view-products-container">
      <h2>View All Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Our Price</th>
            <th>Discount</th>
            <th>Final Price</th>
            <th>Stock Remaining</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>₹{product.original_price}</td>
              <td>₹{product.our_price}</td>
              <td>{product.discount}%</td>
              <td>₹{product.final_price}</td>
              <td>{product.total_stock}</td> {/* Fixed column to display stock */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;

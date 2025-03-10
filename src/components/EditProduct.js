import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    category_name: "",
    product_name: "",
    original_price: "",
    our_price: "",
    discount: "",
    final_price: "",
    unique_code: "",
    total_stock: "",
  });

  const [uniqueCodeInput, setUniqueCodeInput] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  // ✅ (1) Fetch Product by Unique Code
  const handleSearch = async () => {
    try {
      console.log(`🔍 Searching product with unique code: ${uniqueCodeInput}`);
      const response = await axios.get(`https://ecommerce-backend-zssq.onrender.com/api/products/unique/${uniqueCodeInput}`);

      if (response.status === 200 && response.data) {
        console.log("✅ Product found:", response.data);
        setProduct(response.data);
        setShowDetails(true);
      }
    } catch (error) {
      console.error("🚨 Error fetching product:", error);
      alert(error.response?.data?.error || "🚨 Server error while fetching product.");
      setShowDetails(false);
    }
  };

  // ✅ (2) Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedProduct = { ...product, [name]: value };

    if (name === "discount" || name === "our_price") {
      const discount = parseFloat(updatedProduct.discount) || 0;
      const ourPrice = parseFloat(updatedProduct.our_price) || 0;
      updatedProduct.final_price = (ourPrice - (ourPrice * discount) / 100).toFixed(2);
    }

    setProduct(updatedProduct);
  };

  // ✅ (3) Update Product in Database (Fixed for final_price issue)
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!product.id) {
    alert("❌ Product ID is missing. Cannot update product.");
    return;
  }

  try {
    console.log(`🔄 Sending update request for Product ID: ${product.id}`, product);

    const response = await axios.put(
      `https://ecommerce-backend-zssq.onrender.com/api/products/${product.id}`,
      {
        category_name: product.category_name,
        product_name: product.product_name,
        original_price: parseFloat(product.original_price),
        our_price: parseFloat(product.our_price),
        discount: parseFloat(product.discount),
        total_stock: parseInt(product.total_stock),
        unique_code: product.unique_code,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      alert("✅ Product updated successfully!");
      navigate("/admin-dashboard");
    }
  } catch (error) {
    console.error("🚨 Error updating product:", error);
    alert(error.response?.data?.error || "🚨 Error updating product. Please try again.");
  }
};


  return (
    <div className="edit-product-page">
      <div className="edit-product-card">
        <h2>Edit Product Details</h2>

        {/* ✅ Unique Code Input */}
        <div className="form-group-row">
          <label>Enter Unique Code:</label>
          <input
            type="text"
            value={uniqueCodeInput}
            onChange={(e) => setUniqueCodeInput(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSearch}>Search Product</button>

        {/* ✅ Show Product Details ONLY after successful search */}
        {showDetails && (
          <>
            <div className="form-group-row">
              <label>Category Name:</label>
              <select name="category_name" value={product.category_name} onChange={handleInputChange}>
                <option value="">Select Category</option>
                <option value="Mens Clothing">Mens Clothing</option>
                <option value="Womens Clothing">Womens Clothing</option>
                <option value="Food">Food</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Toys">Toys</option>
              </select>
            </div>

            <div className="form-group-row">
              <label>Product Name:</label>
              <input type="text" name="product_name" value={product.product_name} onChange={handleInputChange} required />
            </div>

            <div className="form-group-row">
              <label>Original Price:</label>
              <input type="number" name="original_price" value={product.original_price} onChange={handleInputChange} required />
            </div>

            <div className="form-group-row">
              <label>Our Price:</label>
              <input type="number" name="our_price" value={product.our_price} onChange={handleInputChange} required />
            </div>

            <div className="form-group-row">
              <label>Discount (%):</label>
              <input type="number" name="discount" value={product.discount} onChange={handleInputChange} required />
            </div>

            <div className="form-group-row">
              <label>Final Price:</label>
              <input type="text" name="final_price" value={product.final_price} readOnly />
            </div>

            <div className="form-group-row">
              <label>Total Stock:</label>
              <input type="number" name="total_stock" value={product.total_stock} onChange={handleInputChange} required />
            </div>

            <div className="form-group-row">
              <label>Unique Code:</label>
              <input type="text" name="unique_code" value={product.unique_code} readOnly />
            </div>

            <button type="submit" onClick={handleSubmit}>Update Product</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProduct;

import React from "react";
import "./Products.css";

const Products = () => {
  const productList = [
    { id: 1, name: "Smartphone", price: "₹ 25,999", image: "/images/smartphone.jpg" },
    { id: 2, name: "Laptop", price: "₹ 64,999", image: "/images/laptop.jpg" },
    { id: 3, name: "Wireless Headphones", price: "₹ 4,499", image: "/images/headphones.jpg" },
    { id: 4, name: "Smart Watch", price: "₹ 8,999", image: "/images/smartwatch.jpg" },
    { id: 5, name: "Gaming Console", price: "₹ 45,999", image: "/images/gaming.jpg" },
  ];

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button className="buy-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

import React from "react";
import Navbar from "./Navbar";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div className="welcome-section">
          <h1>Welcome to CHV Shop</h1>
          <p>Exclusive, Handpicked Products Just for You!</p>
        </div>
        <div className="product-cards">
          <div className="card">
            <img src="/images/mens_fashion1.avif" alt="Product 1" />
      
          </div>
          <div className="card">
            <img src="/images/mens_fashion2.avif" alt="Product 2" />
          </div>
          <div className="card">
            <img src="/images/mens_fashion3.avif" alt="Product 3" />
          </div>
          <div className="card">
            <img src="/images/mens_fashion4.avif" alt="Product 4" />
            
          </div>
          <div className="card">
            <img src="/images/mens_fashion5.avif" alt="Product 5" />
            
          </div>
          <div className="card">
            <img src="/images/mens_fashion6.avif" alt="Product 6" />
           
          </div>
          <div className="card">
            <img src="/images/women_fashion1.avif" alt="Product 1" />
      
          </div>
          <div className="card">
            <img src="/images/women_fashion2.avif" alt="Product 2" />
          </div>
          <div className="card">
            <img src="/images/women_fashion3.avif" alt="Product 3" />
          </div>
          <div className="card">
            <img src="/images/women_fashion4.avif" alt="Product 4" />
            
          </div>
          <div className="card">
            <img src="/images/women_fashion5.avif" alt="Product 5" />
            
          </div>
          <div className="card">
            <img src="/images/women_fashion6.avif" alt="Product 6" />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

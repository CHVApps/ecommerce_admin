import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>About Our Store</h1>
      <p>Welcome to ShopName, your one-stop destination for premium products at the best prices.</p>
      
      <div className="about-cards">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>We aim to provide high-quality products with seamless shopping experience.</p>
        </div>
        <div className="about-card">
          <h2>Why Choose Us?</h2>
          <p>Exclusive deals, top-quality products, and excellent customer service.</p>
        </div>
        <div className="about-card">
          <h2>24/7 Support</h2>
          <p>Our team is available 24/7 to assist you with all your queries.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

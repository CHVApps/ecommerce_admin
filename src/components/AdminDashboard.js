import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("");

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="card-container">
        {activeSection !== "products" && activeSection !== "stock" && activeSection !== "billing" && (
          <>
            <div className="dashboard-card">
              <button className="btn-toggle" onClick={() => toggleSection("products")}>
                Products Management
              </button>
            </div>
          </>
        )}
        
        {activeSection === "products" && (
          <div className="dashboard-card">
            <h3>Products Management</h3>
            <Link to="/add-product"><button className="btn-action">Add New Product</button></Link>
            <Link to="/edit-product"><button className="btn-action">Edit/Update Product</button></Link>
            <Link to="/delete-product"><button className="btn-action">Delete/Remove Product</button></Link>
            <Link to="/view-products"><button className="btn-action">View All Products</button></Link>
            <button className="btn-back" onClick={() => setActiveSection("")}>Back</button>
          </div>
        )}

        

        
      </div>
    </div>
  );
};

export default AdminDashboard;

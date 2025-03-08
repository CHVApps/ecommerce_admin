import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>
      <div className="dashboard-options">
        <button className="option-btn sales-btn" onClick={() => navigate("/sales")}>Sales (Billing)</button>
        <button className="option-btn update-btn" onClick={() => navigate("/admin-dashboard")}>Product Updation</button>
        <button className="option-btn transaction-btn" onClick={() => navigate("/transactions")}>Transactions</button>
        <button className="option-btn return-btn" onClick={() => navigate("/return")}>Return</button>
      </div>
    </div>
  );
};

export default AdminPanel;

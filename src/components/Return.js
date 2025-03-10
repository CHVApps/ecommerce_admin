import React, { useState } from "react";
import axios from "axios";
import "./Return.css";

const Return = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [returnMessage, setReturnMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle Search for Reference Number
  const handleSearch = async () => {
    if (!referenceNumber) {
      setError("⚠️ Please enter a reference number.");
      return;
    }

    try {
      setError("");
      setTransaction(null);
      setReturnMessage("");

      const response = await axios.get(`https://ecommerce-backend-zssq.onrender.com/api/return/${referenceNumber}`);

      if (response.data.status === "success") {
        setTransaction(response.data.transaction);
        setReturnMessage(response.data.returnMessage);
      } else {
        setError("❌ No transaction found.");
      }
    } catch (err) {
      console.error("Error fetching transaction:", err);
      setTransaction(null);
      setReturnMessage("");
      setError("❌ Error fetching transaction. Please try again.");
    }
  };

  return (
    <div className="return-container">
      <h2>🔄 Return Products</h2>
      <input
        type="text"
        placeholder="Enter Reference Number"
        value={referenceNumber}
        onChange={(e) => setReferenceNumber(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error-message">{error}</p>}

      {transaction && (
        <div className="transaction-details">
          <h3>🧾 Transaction Details</h3>
          <p><strong>Reference Number:</strong> {transaction.reference_number}</p>
          <p><strong>Customer Number:</strong> {transaction.customer_number}</p>
          <p><strong>Total Price:</strong> ₹{transaction.total_price}</p>
          <p><strong>Transaction Date:</strong> {new Date(transaction.transaction_date).toLocaleDateString()}</p>

          <h3>📦 Purchased Products</h3>
          <ul>
            {Array.isArray(transaction.products) && transaction.products.length > 0 ? (
              transaction.products.map((product, index) => (
                <li key={index}>
                  <strong>{product.product_name}</strong> - {product.quantity} pcs
                </li>
              ))
            ) : (
              <li>No products found in this transaction.</li>
            )}
          </ul>

          <h3 className={returnMessage.includes("Eligible") ? "return-eligible" : "return-not-eligible"}>
            {returnMessage}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Return;

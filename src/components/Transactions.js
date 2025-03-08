import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("❌ Error fetching transactions.");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="transactions-container">
      <h1>📜 All Transactions</h1>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Reference No.</th>
            <th>Customer Number</th>
            <th>Total Price</th>
            <th>Transaction Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.reference_number}</td>
              <td>{t.customer_number}</td>
              <td>₹{parseFloat(t.total_price).toFixed(2)}</td>
              <td>{new Date(t.transaction_date).toLocaleString()}</td>
              <td>
                <button onClick={() => alert(JSON.stringify(t.products, null, 2))}>📄 View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

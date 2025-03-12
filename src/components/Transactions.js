import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1 Day");

  // ✅ API Call: Fetch All Transactions Once
  useEffect(() => {
      const fetchTransactions = async () => {
          try {
              const response = await axios.get("https://ecommerce-backend-lv9n.onrender.com/api/transactions");
              setTransactions(response.data); // ✅ Store all transactions
          } catch (error) {
              console.error("Error fetching transactions:", error);
              alert("❌ Error fetching transactions.");
          }
      };

      fetchTransactions();
  }, []);
   // ✅ Runs only once when component mounts
   const calculateTotalProfit = (transactions) => {
    return transactions.reduce((totalProfit, transaction) => {
        if (!transaction.products || !Array.isArray(transaction.products)) return totalProfit;

        const transactionProfit = transaction.products.reduce((profit, product) => {
            const finalPrice = parseFloat(product.final_price);
            const originalPrice = parseFloat(product.original_price);
            return profit + (finalPrice - originalPrice);
        }, 0);

        return totalProfit + transactionProfit;
    }, 0);
};


  // ✅ Filter Transactions Based on Selected Period (Frontend Filtering)
  const filterTransactions = (transactions, period) => {
      let startDate = new Date();
      let endDate = new Date();

      if (period === "1 Day") {
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
      } else if (period === "1 Month") {
          startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
          endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 999);
      } else if (period === "1 Year") {
          startDate = new Date(startDate.getFullYear(), 0, 1);
          endDate = new Date(startDate.getFullYear(), 11, 31, 23, 59, 59, 999);
      }

      return transactions.filter((t) => {
          const transactionDate = new Date(t.transaction_date);
          return transactionDate >= startDate && transactionDate <= endDate;
      });
  };
  const filteredTransactions = filterTransactions(transactions, selectedPeriod);
  const totalProfit = calculateTotalProfit(filteredTransactions);

  // ✅ Function to calculate profit (Example: 10% of total price)
  

  // ✅ Function to Download Transactions as CSV
  const downloadCSV = () => {
    const csvData = filteredTransactions.map((t) => [
      t.reference_number,
      t.customer_number,
      (parseFloat(t.total_price) || 0).toFixed(2), // ✅ Ensure total_price is always a number
      new Date(t.transaction_date).toLocaleString(),
      
    ]);

    const header = ["Reference No.", "Customer Number", "Total Price", "Transaction Date", "Profit"];
    const csvString = [header, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${selectedPeriod}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="transactions-container">
      <h1>📜 All Transactions</h1>
      

      {/* ✅ Dropdown for Profit Period */}
      <div className="dropdown-container">
        <label htmlFor="profit-period">Profit: </label>
        <select id="profit-period" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
          <option value="1 Day">1 Day</option>
          <option value="1 Month">1 Month</option>
          <option value="1 Year">1 Year</option>
        </select>
        <h2>Total Profit: ₹{totalProfit.toFixed(2)}</h2>
        {/* ✅ Download Button */}
        <button className="download-btn" onClick={downloadCSV}>
          ⬇️ Download file
        </button>
      </div>

      {/* ✅ Transactions Table */}
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
          { filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan="6">No transactions found...</td>
            </tr>
          ) : (
            filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.reference_number}</td>
                <td>{t.customer_number}</td>
                <td>₹{parseFloat(t.total_price).toFixed(2)}</td>
                <td>{new Date(t.transaction_date).toLocaleString()}</td>
               
                <td>
                  <button onClick={() => alert(JSON.stringify(t.products, null, 2))}>📄 View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

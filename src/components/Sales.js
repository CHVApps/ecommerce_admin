import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./sales.css";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("🔄 Waiting for Scan...");
  const [showPopup, setShowPopup] = useState(false);
  const [customerNumber, setCustomerNumber] = useState("");
  const socketRef = useRef(null);

  // ✅ WebSocket Connection Setup
  const connectWebSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  
    socketRef.current = new WebSocket("wss://ecommerce-backend-lv9n.onrender.com");

    socketRef.current.onopen = () => {
      setStatus("✅ Waiting for Barcode Scan...");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        
        // ✅ Fix: Ensure correct response handling
        if (response.status === "success" && response.product) {
          const product = response.product;

          setProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.unique_code === product.unique_code);
            if (existingProduct) {
              return prevProducts.map((p) =>
                p.unique_code === product.unique_code
                  ? { ...p, quantity: p.quantity + 1, final_price: ((p.our_price * (1 - p.discount / 100)) * (p.quantity + 1)).toFixed(2) }
                  : p
              );
            }
            return [...prevProducts, { ...product, quantity: 1, final_price: (product.our_price * (1 - product.discount / 100)).toFixed(2) }];
          });

          setStatus(`✅ Product Added: ${product.product_name}`);
        } else {
          setStatus("❌ Product Not Found");
        }
      } catch (error) {
        setStatus("❌ Error Parsing Server Response");
      }
    };

    socketRef.current.onclose = () => {
      setStatus("❌ Connection Lost. Reconnecting...");
      setTimeout(connectWebSocket, 3000);
    };

    socketRef.current.onerror = () => {
      setStatus("❌ WebSocket Error!");
    };
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectWebSocket]);

  // ✅ Remove Product from List
  const removeProduct = (unique_code) => {
    setProducts((prevProducts) =>
      prevProducts
        .map((p) => (p.unique_code === unique_code ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  // ✅ Calculate Total Price
  const totalPrice = products.reduce((sum, p) => sum + parseFloat(p.final_price), 0);

  // ✅ Confirm Bill
  const handleConfirmBill = () => {
    if (!customerNumber) {
      alert("Please enter a mobile number!");
      return;
    }
  
    const message = `Hello! Your total bill is ₹${totalPrice.toFixed(2)}\n\nProducts:\n` +
      products.map(p => `${p.product_name} x${p.quantity} - ₹${p.final_price} (Ref: ${p.unique_code})`).join('\n');
  
    const whatsappUrl = `https://wa.me/${customerNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  

  return (
    <div className="sales-container">
      <h1>🛒 Sales Dashboard</h1>
      <h3>{status}</h3>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Category</th>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Our Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Final Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="9">No product scanned yet...</td>
            </tr>
          ) : (
            products.map((p, index) => (
              <tr key={p.unique_code}>
                <td>{index + 1}</td>
                <td>{p.category_name}</td>
                <td>{p.product_name}</td>
                <td>₹{p.original_price}</td>
                <td>₹{p.our_price}</td>
                <td>{p.discount}%</td>
                <td>{p.quantity}</td>
                <td>₹{p.final_price}</td>
                <td>
                  <button className="remove-btn" onClick={() => removeProduct(p.unique_code)}>Remove</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {products.length > 0 && (
        <div className="total-section">
          <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
          <button className="make-bill-btn" onClick={() => setShowPopup(true)}>Make Bill</button>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2>📩 Send Bill</h2>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
            />
            <button onClick={handleConfirmBill} className="confirm-bill-btn">Confirm Bill</button>
            <button onClick={() => setShowPopup(false)} className="close-popup">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;

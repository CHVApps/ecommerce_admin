import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import JsBarcode from "jsbarcode";
import "./ViewProducts.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [generatedBarcodes, setGeneratedBarcodes] = useState({});
  const barcodeRefs = useRef({});

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-backend-theta-plum.vercel.app/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Function to generate barcode when button is clicked
  const generateBarcode = (product) => {
    setGeneratedBarcodes((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      if (product.unique_code && barcodeRefs.current[product.id]) {
        JsBarcode(barcodeRefs.current[product.id], product.unique_code, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 40,
          displayValue: true,
        });
      }
    }, 100);
  };

  // Function to print multiple barcodes equal to the stock quantity
  const handlePrint = (product) => {
    const printWindow = window.open();
    printWindow.document.write(`
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .barcode-container { display: flex; flex-wrap: wrap; gap: 10px; padding: 20px; }
          .barcode-item { text-align: center; border: 1px solid #000; padding: 10px; width: 180px; }
          svg { width: 100%; }
        </style>
      </head>
      <body>
        <h2>Product: ${product.product_name}</h2>
        <p>Unique Code: ${product.unique_code}</p>
        <h3>Printing ${product.total_stock} Barcodes</h3>
        <div class="barcode-container">
    `);

    for (let i = 0; i < product.total_stock; i++) {
      printWindow.document.write(`
        <div class="barcode-item">
          <p>${product.product_name}</p>
          <svg id="barcode-${i}"></svg>
        </div>
      `);
    }

    printWindow.document.write(`
        </div>
        <script>
          function generateBarcodes() {
            for (let i = 0; i < ${product.total_stock}; i++) {
              JsBarcode("#barcode-" + i, "${product.unique_code}", {
                format: "CODE128",
                lineColor: "#000",
                width: 2,
                height: 40,
                displayValue: true,
              });
            }
          }
          window.onload = generateBarcodes;
        </script>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
        <button onclick="window.print()">Print</button>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="view-products-container">
      <h2>View All Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Our Price</th>
            <th>Discount</th>
            <th>Final Price</th>
            <th>Stock Remaining</th>
            <th>Action</th>
            <th>Barcode</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>₹{product.original_price}</td>
              <td>₹{product.our_price}</td>
              <td>{product.discount}%</td>
              <td>₹{product.final_price}</td>
              <td>{product.total_stock}</td>
              <td>
                <button className="btn-generate-barcode" onClick={() => generateBarcode(product)}>
                  Generate Barcode
                </button>
              </td>
              <td>
                {generatedBarcodes[product.id] && (
                  <>
                    <svg ref={(el) => (barcodeRefs.current[product.id] = el)} />
                    <button className="btn-print-barcode" onClick={() => handlePrint(product)}>
                      Print Barcodes
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;

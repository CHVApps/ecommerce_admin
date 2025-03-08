import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JsBarcode from "jsbarcode";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    category_name: "",
    product_name: "",
    original_price: "",
    our_price: "",
    discount: "",
    final_price: "",
    unique_code: "",
    total_stock: "",
  });

  const barcodeRef = useRef(null);

  useEffect(() => {
    if (product.unique_code && barcodeRef.current) {
      JsBarcode(barcodeRef.current, product.unique_code, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: true,
      });
    }
  }, [product.unique_code]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => {
      let updatedProduct = { ...prevProduct, [name]: value };

      if (["discount", "our_price", "original_price"].includes(name)) {
        const discount = parseFloat(updatedProduct.discount) || 0;
        const ourPrice = parseFloat(updatedProduct.our_price) || 0;
        updatedProduct.final_price = (ourPrice - (ourPrice * discount) / 100).toFixed(2);
      }

      return updatedProduct;
    });
  };

  const generateBarcode = async () => {
    const uniqueCode = Math.floor(10000000 + Math.random() * 90000000).toString();

    try {
      const response = await axios.post("http://localhost:5001/api/products/generate-barcode", {
        unique_code: uniqueCode,
      });

      setProduct((prevProduct) => ({
        ...prevProduct,
        unique_code: response.data.unique_code,
      }));
    } catch (error) {
      console.error("[ERROR] Barcode Generation Failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.unique_code) {
      alert("Please generate a barcode before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/products", {
        category_name: product.category_name,
        product_name: product.product_name,
        original_price: parseFloat(product.original_price),
        our_price: parseFloat(product.our_price),
        discount: parseFloat(product.discount) || 0,
        final_price: parseFloat(product.final_price),
        unique_code: product.unique_code,
        total_stock: parseInt(product.total_stock) || 0,
      });

      alert("Product added successfully!");
      setProduct({
        category_name: "",
        product_name: "",
        original_price: "",
        our_price: "",
        discount: "",
        final_price: "",
        unique_code: "",
        total_stock: "",
      });
    } catch (error) {
      console.error("[ERROR] Product Submission Failed:", error.response?.data || error);
      alert("Error adding product!");
    }
  };

  const handlePrint = () => {
    const barcodeElement = document.getElementById("barcode");
    const printWindow = window.open();
    printWindow.document.write("<html><body>");
    printWindow.document.write(`<h2>Barcode</h2><p>Unique Code: ${product.unique_code}</p>`);
    printWindow.document.write(barcodeElement.outerHTML);
    printWindow.document.write('<button onclick="window.print()">Print</button>');
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="add-product-container">
      <div className="product-card">
        <h2 className="card-title">ADD PRODUCT</h2>

        <div className="form-group">
          <label>Category:</label>
          <select name="category_name" value={product.category_name} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            <option value="Mens Clothing">Mens Clothing</option>
            <option value="Womens Clothing">Womens Clothing</option>
            <option value="Food">Food</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
          </select>
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" name="product_name" value={product.product_name} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Original Price:</label>
          <input type="number" name="original_price" value={product.original_price} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Our Price:</label>
          <input type="number" name="our_price" value={product.our_price} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Discount (%):</label>
          <input type="number" name="discount" value={product.discount} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Final Price:</label>
          <input type="text" name="final_price" value={product.final_price} readOnly />
        </div>

        <div className="form-group">
          <label>Total Stock:</label>
          <input type="number" name="total_stock" value={product.total_stock} onChange={handleInputChange} required />
        </div>

        <div className="button-group">
          <button onClick={generateBarcode} className="btn-generate-barcode">Generate Barcode</button>
          <button onClick={handleSubmit} className="btn-submit">Submit</button>
        </div>

        {product.unique_code && (
          <div className="barcode-card">
            <h3>Unique Code: {product.unique_code}</h3>
            <svg ref={barcodeRef} id="barcode" />
            <button className="btn-print-barcode" onClick={handlePrint}>Print Barcode</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel"; // New Import
import AdminDashboard from "./components/AdminDashboard";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import DeleteProduct from "./components/DeleteProduct";
import ViewProducts from "./components/ViewProducts";

import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Transactions from "./components/Transactions";
import Return from "./components/Return"; // New Import

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/view-products" element={<ViewProducts />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/return" element={<Return />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Location from "./pages/Location";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Policy from "./pages/Policy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/employee");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchProducts();
    fetchEmployees();
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home products={products} members={members} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route
          path="/products/:id"
          element={<ProductDetail products={products} />}
        />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blogs" element={<Blogs />} />

        <Route path="/team" element={<Team members={members} />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

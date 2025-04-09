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
import ProductDetail from "./pages/ProductDetail";
import productService from "./services/productService";
import employeeService from "./services/employeeService";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import EmployeesAdmin from "./pages/admin/EmployeesAdmin";

const App = () => {
  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getAllEmployee();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchLoggedUser = () => {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        productService.setToken(user.token);
      }
    };

    fetchProducts();
    fetchEmployees();
    fetchLoggedUser();
  }, []);

  // Check if the current route is "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin/");

  console.log(user);

  return (
    <div>
      {!isAdminRoute && <Header />}
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
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route
            path="products"
            element={<ProductsAdmin products={products} />}
          />
          <Route
            path="employees"
            element={<EmployeesAdmin members={members} />}
          />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;

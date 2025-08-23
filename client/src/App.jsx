import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Location from "./pages/Location";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Policy from "./pages/Policy";
import ProductDetail from "./pages/ProductDetail";
import productService from "./services/productService";
import employeeService from "./services/employeeService";
import Login from "./pages/Login";
import AdminLayout from "./pages/Admin/AdminLayout";
import ProductsAdmin from "./pages/Admin/ProductsAdmin";
import EmployeesAdmin from "./pages/Admin/EmployeesAdmin";
import PrivateRoute from "./pages/PrivateRoute";
import PublicLayout from "./pages/PublicLayout";
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetail from "./components/ProjectDetail";

const App = () => {
  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);

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
        const data = await employeeService.getAllEmployees();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchProducts();
    fetchEmployees();
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/about" element={<About members={members} />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route
            path="/products/:id"
            element={<ProductDetail products={products} />}
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />

          <Route path="/team" element={<Team members={members} />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="employees" element={<EmployeesAdmin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Location from "./pages/Location";
import Product from "./pages/Product";
import Project from "./pages/Project";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Policy from "./pages/Policy";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/project" element={<Project />} />
        <Route path="/blog" element={<Blog />} />

        <Route path="/team" element={<Team />} />
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

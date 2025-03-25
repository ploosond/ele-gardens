import { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";
import Filter from "../components/Filter";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/product/").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="px-4 py-6 sm:px-8 md:px-12 lg:px-16">
      <div className="flex flex-col gap-6 sm:flex-row">
        <Filter />
        <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Products key={product.tag} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

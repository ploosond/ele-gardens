import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchInput from "../components/util/SearchInput";
import { Link } from "react-router";

const Products = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredProducts(
        (products || []).filter((product) => {
          const desc =
            typeof product.description === "object"
              ? product.description.en || product.description.de || ""
              : product.description || "";
          return (
            (product.common_name || "")
              .toString()
              .toLowerCase()
              .includes(term) ||
            (product.scientific_name || "")
              .toString()
              .toLowerCase()
              .includes(term) ||
            desc.toString().toLowerCase().includes(term)
          );
        }),
      );
    }
  }, [searchTerm, products]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative mt-10 bg-gradient-to-r from-green-900 to-green-700 pb-8 pt-16 text-white">
        {/* Content */}
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-4xl font-bold md:text-5xl">
              Our Product <span className="text-green-300">Collection</span>
            </h2>
            <p className="text-lg leading-relaxed text-white/80">
              Discover our wide range of plants, carefully curated to bring
              beauty and sustainability to your space.
            </p>
          </div>
        </div>
      </section>

      {/* Search input */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
          />
        </div>
      </div>

      {/* Products Section */}
      <section className="bg-white py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Products Grid */}
            <div className="w-full">
              {filteredProducts.length === 0 ? (
                <div className="rounded-lg bg-gray-100 py-12 text-center">
                  <h3 className="mb-2 text-xl font-medium">
                    No products found
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Try adjusting your filters or search term.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                  {filteredProducts.map((product) => (
                    <Link key={product._id} to={`/products/${product._id}`}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;

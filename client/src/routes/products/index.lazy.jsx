import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import SearchInput from "../../components/SearchInput";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import productService from "../../api/productService";

export const Route = createLazyFileRoute("/products/")({
  component: Products,
});

function Products() {
  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAllProducts(),
    staleTime: 30000,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products || []);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredProducts(
        (products || []).filter((product) => {
          const desc =
            typeof product.description === "object"
              ? product.description.en || product.description.de || ""
              : product.description || "";
          return (
            (product.common_name.en || "")
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

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Error: {error.message}</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary py-12 pb-8 text-on-dark">
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
      <div className="bg-gradient-to-r from-primary-dark to-primary pb-6">
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
                    className="rounded-md bg-primary px-4 py-2 text-on-dark hover:bg-primary-dark"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product._id}
                      to="/products/$productId"
                      params={{
                        productId: product._id,
                      }}
                    >
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
}

export default Products;

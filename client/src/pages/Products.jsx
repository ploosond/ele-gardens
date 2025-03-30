import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import SearchInput from "../components/util/SearchInput";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router";

const Products = ({ products }) => {
  const [filtersVisible, setFiltersVisible] = useState(false); // State to toggle filters visibility
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [filters, setFilters] = useState({
    category: "",
    searchTerm: "",
    light: [], // Array to store selected light requirements
  });

  // Update filtered products when filters change
  useEffect(() => {
    let result = products;

    // Filter by category
    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category,
      );
    }

    // Filter by light requirements
    if (filters.light.length > 0) {
      result = result.filter((product) =>
        filters.light.includes(product.light),
      );
    }

    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.common_name.toLowerCase().includes(term) ||
          product.scientific_name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term),
      );
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const clearFilters = () => {
    setFilters({
      category: "",
      searchTerm: "",
      light: [],
    });
  };

  const handleLightChange = (lightType) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.light.includes(lightType);
      if (isSelected) {
        return {
          ...prevFilters,
          light: prevFilters.light.filter((light) => light !== lightType),
        };
      } else {
        return {
          ...prevFilters,
          light: [...prevFilters.light, lightType],
        };
      }
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Our Product"
        highlight="Collection"
        description="Discover our wide range of plants, carefully curated to bring
              beauty and sustainability to your space."
      />

      {/* Search input */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SearchInput
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
            placeholder="Search products..."
          />
        </div>
      </div>

      {/* Products Section */}
      <section className="bg-three py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar/Filters */}
            <div className="w-1/2 lg:w-1/4">
              {/* Toggle Button for Filters */}
              <button
                className="mb-4 flex w-full items-center justify-between rounded-lg bg-tertiary px-4 py-2 text-white lg:hidden"
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <span>Filters</span>
                <span>{filtersVisible ? <ChevronUp /> : <ChevronDown />}</span>
              </button>

              {/* Filters Section */}
              <div
                className={`rounded-lg bg-white p-6 shadow-md transition-all duration-300 ${
                  filtersVisible ? "block" : "hidden"
                } lg:block`}
              >
                <h3 className="mb-4 text-lg font-medium">Filters</h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all"
                        name="category"
                        checked={filters.category === ""}
                        onChange={() =>
                          setFilters({ ...filters, category: "" })
                        }
                        className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="all" className="text-sm text-gray-700">
                        All
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="flower"
                        name="category"
                        checked={filters.category === "flower"}
                        onChange={() =>
                          setFilters({ ...filters, category: "flower" })
                        }
                        className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="flower" className="text-sm text-gray-700">
                        Flower
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="grass"
                        name="category"
                        checked={filters.category === "grass"}
                        onChange={() =>
                          setFilters({ ...filters, category: "grass" })
                        }
                        className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="grass" className="text-sm text-gray-700">
                        Grass
                      </label>
                    </div>
                  </div>
                </div>

                {/* Light Requirements */}
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium">
                    Light Requirements
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sun"
                        checked={filters.light.includes("sun")}
                        onChange={() => handleLightChange("sun")}
                        className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="sun" className="text-sm text-gray-700">
                        Sun
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="half-shadow"
                        checked={filters.light.includes("half-shadow")}
                        onChange={() => handleLightChange("half-shadow")}
                        className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label
                        htmlFor="half-shadow"
                        className="text-sm text-gray-700"
                      >
                        Half-shadow
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="shadow"
                        checked={filters.light.includes("shadow")}
                        onChange={() => handleLightChange("shadow")}
                        className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="shadow" className="text-sm text-gray-700">
                        Shadow
                      </label>
                    </div>
                  </div>
                </div>

                {(filters.category ||
                  filters.searchTerm ||
                  filters.light.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="mb-4 text-sm text-green-600 hover:text-green-800"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h2 className="text-xl font-medium">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"}
                </h2>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="rounded-lg bg-gray-100 py-12 text-center">
                  <h3 className="mb-2 text-xl font-medium">
                    No products found
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Try adjusting your filters or search term.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Link key={product.tag} to={`/products/${product.tag}`}>
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

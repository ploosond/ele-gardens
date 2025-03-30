import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-lg bg-white shadow-md transition hover:shadow-lg">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/150"}
          alt={product.common_name}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {product.category || "Unknown"}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-800">
          {product.common_name}
        </h3>
        <p className="mb-2 text-sm italic text-gray-500">
          {product.scientific_name}
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Height: {product.height || "N/A"}
        </p>
        <div className="flex items-center justify-between">
          <p className="flex items-center text-sm font-medium text-green-600 transition hover:text-green-800">
            View details <span className="ml-1">→</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

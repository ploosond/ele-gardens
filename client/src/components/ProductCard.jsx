const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md transition hover:shadow-lg">
      {/* Image Section */}
      <div className="relative overflow-hidden object-cover">
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/150"}
          alt={product.common_name}
          className="h-96 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-800">
          {product.common_name}
        </h3>
        <p className="mb-2 text-sm italic text-gray-500">
          {product.scientific_name}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

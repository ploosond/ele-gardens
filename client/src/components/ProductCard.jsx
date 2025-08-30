const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md transition hover:shadow-lg">
      {/* Image Section */}
      <div className="h-1" style={{ backgroundColor: product.color }}></div>
      <div className="relative overflow-hidden object-cover">
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/150"}
          alt={product.common_name}
          className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-96"
        />
      </div>

      {/* Content Section */}
      <div
        className="overflow-hidden p-4"
        style={{ backgroundColor: product.color, height: "6rem" }}
      >
        <h3 className="text-sm font-semibold italic text-white md:text-lg">
          {product.common_name?.en}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;

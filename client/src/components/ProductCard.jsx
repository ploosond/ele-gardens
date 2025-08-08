const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md transition hover:shadow-lg">
      {/* Image Section */}
      <div className="h-1" style={{ backgroundColor: product.color }}></div>
      <div className="relative overflow-hidden object-cover">
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/150"}
          alt={product.common_name}
          className="h-96 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div
        className="overflow-hidden p-4"
        style={{ backgroundColor: product.color, height: "6rem" }}
      >
        <h3 className="text-lg font-semibold text-white">
          {product.scientific_name}
        </h3>
        <p className="mb-4 text-sm italic text-white">{product.common_name}</p>
      </div>
    </div>
  );
};

export default ProductCard;

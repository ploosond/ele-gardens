import React from "react";

const Products = ({ product }) => {
  return (
    <div
      key={product._id}
      className="rounded-sm border p-2 shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <img
        src={product.images[0]?.url}
        alt={product.common_name}
        className="h-32 w-full rounded-sm object-cover"
      />
      <h3 className="mt-2 text-sm font-semibold">{product.common_name}</h3>
      <p className="text-xs text-gray-600">{product.scientific_name}</p>
    </div>
  );
};

export default Products;

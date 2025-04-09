import React from "react";

const ProductsAdmin = ({ products }) => {
  if (!products) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 flex flex-row-reverse items-center justify-between">
        <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          Add +
        </button>
      </div>
      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-3">Tag</th>
            <th className="border p-3">Common Name</th>
            <th className="border p-3">Scientific Name</th>
            <th className="border p-3">Category</th>
            <th className="border p-3">Description</th>
            <th className="border p-3">Diameter</th>
            <th className="border p-3">Hardiness</th>
            <th className="border p-3">Height</th>
            <th className="border p-3">Light</th>
            <th className="border p-3">Images</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.tag} className="hover:bg-gray-100">
              <td className="border p-3">{p.tag}</td>
              <td className="border p-3">{p.common_name}</td>
              <td className="border p-3">{p.scientific_name}</td>
              <td className="border p-3">{p.category}</td>
              <td className="border p-3">{p.description}</td>
              <td className="border p-3">{p.diameter}</td>
              <td className="border p-3">{p.hardiness}</td>
              <td className="border p-3">{p.height}</td>
              <td className="border p-3">{p.light}</td>
              <td className="flex gap-2 border p-3">
                {p.images.map((i) => (
                  <img
                    className="h-16 w-16 rounded object-cover"
                    key={i._id}
                    src={i.url}
                    alt={i.altText || "Product Image"}
                  />
                ))}
              </td>
              <td className="flex gap-2 border p-3">
                <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
                  Update
                </button>
                <button className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;

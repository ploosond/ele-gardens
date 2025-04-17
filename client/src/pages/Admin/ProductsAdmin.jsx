import { useEffect, useState } from "react";
import productService from "../../services/productService";
import AddProductForm from "../../components/AddProductForm";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = async (product, productId) => {
    if (window.confirm(`Are you sure you want to delete ${product}?`)) {
      await productService.deleteProduct(productId);
      setProducts(products.filter((p) => p._id !== productId));
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowAddForm(false); // Hide the form after adding
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 flex flex-row-reverse items-center justify-between">
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          {showAddForm ? "Cancel" : "Add +"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddProductForm onProductAdded={handleProductAdded} />
        </div>
      )}

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
                {/* <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
                  Update
                </button> */}
                <button
                  onClick={() => handleDelete(p.common_name, p._id)}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
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

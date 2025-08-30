import { useEffect, useState } from "react";
import productService from "../../services/productService";
import AddProductForm from "../../components/AddProductForm";
import EditProductForm from "./EditProductForm";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p,
      ),
    );
    setEditingProduct(null);
  };

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
    <div className="min-h-screen bg-muted p-6">
      <div className="mb-4 flex flex-row-reverse items-center justify-between">
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="rounded bg-primary px-4 py-2 text-on-dark hover:bg-primary-dark"
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
            <th className="border p-3">Common Name (EN)</th>
            <th className="border p-3">Common Name (DE)</th>
            <th className="border p-3">Description (EN)</th>
            <th className="border p-3">Description (DE)</th>
            <th className="border p-3">Height (cm)</th>
            <th className="border p-3">Diameter (cm)</th>
            <th className="border p-3">Hardiness (°C)</th>
            <th className="border p-3">Light (EN)</th>
            <th className="border p-3">Light (DE)</th>
            <th className="border p-3">Images</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...products]
            .sort((a, b) =>
              (a.common_name?.en || "").localeCompare(b.common_name?.en || ""),
            )
            .map((p) =>
              editingProduct?._id === p._id ? (
                <tr key={p._id}>
                  <td colSpan={11} className="p-3">
                    <EditProductForm
                      product={p}
                      onUpdate={handleProductUpdated}
                      onCancel={() => setEditingProduct(null)}
                    />
                  </td>
                </tr>
              ) : (
                <tr key={p._id} className="hover:bg-gray-100">
                  <td className="border p-3">{p.common_name?.en}</td>
                  <td className="border p-3">{p.common_name?.de}</td>
                  <td className="border p-3">{p.description?.en}</td>
                  <td className="border p-3">{p.description?.de}</td>
                  <td className="border p-3">{p.height}</td>
                  <td className="border p-3">{p.diameter}</td>
                  <td className="border p-3">{p.hardiness}</td>
                  <td className="border p-3">{p.light?.en}</td>
                  <td className="border p-3">{p.light?.de}</td>
                  <td className="border p-3">
                    <div className="flex flex-col gap-2">
                      {(Array.isArray(p.images) ? p.images : []).map((i) => (
                        <img
                          className="h-16 w-16 rounded object-cover"
                          key={i.url}
                          src={i.url}
                          alt={i.altText || "Product Image"}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="flex flex-col gap-2 border p-3">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await handleDelete(p.common_name?.en, p._id);
                        } catch (error) {
                          alert("Failed to delete product.");
                        }
                      }}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;

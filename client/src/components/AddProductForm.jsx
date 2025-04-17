import { useState } from "react";
import productService from "../services/productService";

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    tag: "",
    scientific_name: "",
    common_name: "",
    category: "grass", // Default to the first enum value
    description: "",
    images: [{ url: "" }, { url: "" }, { url: "" }], // Three image URLs
    height: "",
    diameter: "",
    hardiness: "",
    light: "sun", // Default to the first enum value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index].url = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedProduct = await productService.createProduct(formData);
      onProductAdded(addedProduct); // Notify parent component
      setFormData({
        tag: "",
        scientific_name: "",
        common_name: "",
        category: "grass",
        description: "",
        images: [{ url: "" }, { url: "" }, { url: "" }],
        height: "",
        diameter: "",
        hardiness: "",
        light: "sun",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded bg-white p-6 shadow-md"
    >
      <h2 className="text-lg font-semibold">Add New Product</h2>

      {/* General Information Section */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Tag <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Scientific Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="scientific_name"
            value={formData.scientific_name}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Common Name</label>
          <input
            type="text"
            name="common_name"
            value={formData.common_name}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          >
            <option value="grass">Grass</option>
            <option value="flower">Flower</option>
          </select>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
      </div>

      {/* Dimensions Section */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Height (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Diameter (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="diameter"
            value={formData.diameter}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Hardiness <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="hardiness"
            value={formData.hardiness}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Light <span className="text-red-500">*</span>
          </label>
          <select
            name="light"
            value={formData.light}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          >
            <option value="sun">Sun</option>
            <option value="half-shadow">Half-Shadow</option>
            <option value="shadow">Shadow</option>
          </select>
        </div>
      </div>

      {/* Images Section */}
      <div>
        <h3 className="text-sm font-medium">Image URLs</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Image URL 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.images[0].url}
              onChange={(e) => handleImageChange(0, e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Enter the first image URL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Image URL 2 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.images[1].url}
              onChange={(e) => handleImageChange(1, e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Enter the second image URL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Image URL 3 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.images[2].url}
              onChange={(e) => handleImageChange(2, e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Enter the third image URL"
              required
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-26 flex rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;

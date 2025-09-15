import { useState, useEffect } from "react";
import productService from "../api/productService";

const EditProductForm = ({ product, onUpdate, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const colors = [
    "#D32F2F", // Crimson Red
    "#E91E63", // Magenta Pink
    "#F8BBD0", // Soft Blush Pink
    "#FF7043", // Sunset Orange
    "#FFEB3B", // Golden Yellow
    "#FFC107", // Amber Gold
    "#8E24AA", // Vivid Violet
    "#B39DDB", // Lavender Purple
    "#42A5F5", // Sky Blue
    "#303F9F", // Deep Indigo
    "#81C784", // Fresh Mint Green
    "#388E3C", // Forest Green
    "#FFFFFF", // Pure White
    "#F5F5DC", // Cream / Ivory
    "#212121", // Midnight Black
  ];

  const [formData, setFormData] = useState({
    common_name_en: "",
    common_name_de: "",
    description_en: "",
    description_de: "",
    height: "",
    diameter: "",
    hardiness: "",
    light: "sun",
    color: "",
  });

  const [existingImages, setExistingImages] = useState([]); // already uploaded
  const [newImages, setNewImages] = useState([]); // newly uploaded

  const lightDEMap = {
    sun: "sonne",
    "half-shadow": "halb-schatten",
    shadow: "schatten",
  };

  useEffect(() => {
    if (product) {
      setFormData({
        common_name_en: product.common_name?.en || "",
        common_name_de: product.common_name?.de || "",
        description_en: product.description?.en || "", // Ensure description_en is set
        description_de: product.description?.de || "", // Ensure description_de is set
        height: product.height || "",
        diameter: product.diameter || "",
        hardiness: product.hardiness || "",
        light: product.light?.en || "sun", // Ensure light is set
        color: product.color || "",
      });
      setExistingImages(product.images || []);
      setNewImages([]);
    }
    return () => {
      // revoke any created object URLs for newImages
      newImages.forEach((f) => {
        URL.revokeObjectURL(f && f.previewUrl ? f.previewUrl : undefined);
      });
    };
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (existingImages.length + newImages.length + files.length > 3) {
      alert("You can upload up to 3 images only.");
      return;
    }
    // attach a previewUrl to each file so we can revoke later
    const filesWithPreview = files.map((f) => {
      f.previewUrl = URL.createObjectURL(f);
      return f;
    });
    setNewImages((prev) => [...prev, ...filesWithPreview]);
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingImages.length + newImages.length < 1) {
      alert("At least one image is required.");
      return;
    }

    try {
      setIsLoading(true); // Start loading

      // Flatten description and light fields
      const formPayload = new FormData();
      formPayload.append("common_name_en", formData.common_name_en);
      formPayload.append("common_name_de", formData.common_name_de);
      formPayload.append("description_en", formData.description_en); // Flattened
      formPayload.append("description_de", formData.description_de); // Flattened
      formPayload.append("height", formData.height);
      formPayload.append("diameter", formData.diameter);
      formPayload.append("hardiness", formData.hardiness);
      formPayload.append("light_en", formData.light); // Flattened
      formPayload.append("light_de", lightDEMap[formData.light]); // Flattened
      if (formData.color) formPayload.append("color", formData.color);

      // Add new images
      newImages.forEach((file) => formPayload.append("images", file));

      // Add existing images
      formPayload.append("existingImages", JSON.stringify(existingImages));

      const updatedProduct = await productService.updateProduct(
        product._id,
        formPayload,
      );
      onUpdate(updatedProduct);
    } catch (error) {
      console.error(
        "Failed to update product:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.error || "Failed to update product.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-6 max-w-3xl rounded bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-700">Edit Product</h2>

      {/* Common Name (EN/DE) */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700">
            Common Name (EN)
          </label>
          <input
            type="text"
            name="common_name_en"
            value={formData.common_name_en}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Common Name (DE)
          </label>
          <input
            type="text"
            name="common_name_de"
            value={formData.common_name_de}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700">
            Description (EN)
          </label>
          <textarea
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Description (DE)
          </label>
          <textarea
            name="description_de"
            value={formData.description_de}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>
      </div>

      {/* Dimensions */}
      <div className="mb-4 grid grid-cols-3 gap-4">
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height (cm)"
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          name="diameter"
          value={formData.diameter}
          onChange={handleChange}
          placeholder="Diameter (cm)"
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          name="hardiness"
          value={formData.hardiness}
          onChange={handleChange}
          placeholder="Hardiness"
          className="w-full rounded border p-2"
        />
      </div>

      {/* Light */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Light</label>
        <select
          name="light"
          value={formData.light}
          onChange={(e) => setFormData({ ...formData, light: e.target.value })}
          className="w-full rounded border p-2"
        >
          <option value="sun">Sun</option>
          <option value="half-shadow">Half-Shadow</option>
          <option value="shadow">Shadow</option>
        </select>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Select Color</label>
        <div className="mt-1 flex gap-2">
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => setFormData({ ...formData, color: c })}
              className={`h-8 w-8 cursor-pointer rounded-full border-2 transition-all duration-200 ${
                formData.color === c
                  ? "scale-110 border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Images (1-3)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full rounded border p-2"
        />
        <div className="mt-2 flex flex-row gap-2 overflow-x-auto">
          {existingImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt="Existing"
                className="h-16 w-16 rounded object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index, true)}
                className="absolute right-1/2 top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
          {newImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.previewUrl}
                alt="New"
                className="h-16 w-16 rounded object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  // revoke preview URL and remove

                  URL.revokeObjectURL(file.previewUrl);

                  handleRemoveImage(index);
                }}
                className="absolute right-1/2 top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded px-6 py-2 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLoading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-300 px-6 py-2 font-semibold transition hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;

import { useState } from "react";
import productService from "../services/productService";
import { toast } from "sonner";

const AddProductForm = ({ onProductAdded }) => {
  const [isLoading, setIsLoading] = useState(false);

  const colors = [
    "#6a844a",
    "#748f3b",
    "#a6c338",
    "#647867",
    "#875b72",
    "#3b5833",
    "#556b2f",
    "#4c4f4a",
  ];

  const [formData, setFormData] = useState({
    common_name: "",
    description_en: "",
    description_de: "",
    height: "",
    diameter: "",
    hardiness: "",
    light: "sun",
    color: "",
  });

  const lightDEMap = {
    sun: "sonne",
    "half-shadow": "halb-schatten",
    shadow: "schatten",
  };

  const [images, setImages] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("You can upload up to 3 images only.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  // Remove a selected image
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation for required fields
    const missing = [];
    if (!formData.common_name) missing.push("Common name");
    if (!formData.description_en) missing.push("Description (EN)");
    if (!formData.description_de) missing.push("Description (DE)");
    if (!formData.height) missing.push("Height");
    if (!formData.diameter) missing.push("Diameter");
    if (!formData.hardiness) missing.push("Hardiness");
    if (!formData.light) missing.push("Light");
    if (!formData.color) missing.push("Color");
    if (images.length < 1) missing.push("At least one image");

    if (missing.length > 0) {
      alert("Please fill required fields: " + missing.join(", "));
      return;
    }

    try {
      setIsLoading(true); // <-- start loading

      const light = {
        en: formData.light,
        de: lightDEMap[formData.light],
      };

      // Format the input values
      const formattedFormData = {
        ...formData,
        height: formData.height.replace(/–/g, "-").trim(),
        diameter: formData.diameter.replace(/–/g, "-").trim(),
        hardiness: formData.hardiness.replace(/–/g, "-").trim(),
      };

      const formDataToSend = new FormData();
      formDataToSend.append("common_name", formData.common_name);
      formDataToSend.append("description_en", formData.description_en);
      formDataToSend.append("description_de", formData.description_de);
      formDataToSend.append("height", formattedFormData.height);
      formDataToSend.append("diameter", formattedFormData.diameter);
      formDataToSend.append("hardiness", formattedFormData.hardiness);
      formDataToSend.append("light_en", light.en);
      formDataToSend.append("light_de", light.de);
      formDataToSend.append("color", formData.color);

      images.forEach((file) => formDataToSend.append("images", file));

  const addedProduct = await productService.createProduct(formDataToSend);

      onProductAdded(addedProduct);
      setFormData({
        common_name: "",
        description_en: "",
        description_de: "",
        height: "",
        diameter: "",
        hardiness: "",
        light: "sun",
        color: "",
      });
      setImages([]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to add product.");
    } finally {
      setIsLoading(false); // <-- stop loading
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded bg-white p-6 shadow-md"
    >
      <h2 className="text-lg font-semibold">Add New Product</h2>

      {/* Common Name */}
      <div>
        <label className="block text-sm font-medium">
          Common Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="common_name"
          value={formData.common_name}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="e.g. Ficus lyrata"
          required
        />
      </div>

      {/* Descriptions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Description (EN) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="Short description in English"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Description (DE) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description_de"
            value={formData.description_de}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="Kurze Beschreibung auf Deutsch"
            required
            aria-required="true"
          />
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Height (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. 10-20"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Diameter (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="diameter"
            value={formData.diameter}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. 5-10"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Hardiness (°C) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hardiness"
            value={formData.hardiness}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. 3-5"
            required
          />
        </div>
      </div>

      {/* Light */}

      <div>
        <label className="block text-sm font-medium">
          Light <span className="text-red-500">*</span>
        </label>
        <select
          name="light"
          value={formData.light}
          onChange={(e) => setFormData({ ...formData, light: e.target.value })}
          className="w-full rounded border p-2"
          required
          aria-required="true"
        >
          <option value="sun">Sun</option>
          <option value="half-shadow">Half-Shadow</option>
          <option value="shadow">Shadow</option>
        </select>
        <p className="mt-1 text-gray-500">DE: {lightDEMap[formData.light]}</p>
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
        <label className="block font-medium text-gray-700">Images (1-3) <span className="text-red-500">*</span></label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full rounded border p-2"
        />
        <div className="mt-2 flex flex-row gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt="Product"
                className="h-16 w-16 rounded object-cover"
              />
              <button
                type="button"
                className="absolute right-1/2 top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white transition hover:bg-red-600"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-26 flex rounded px-4 py-2 text-white ${
          isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isLoading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;

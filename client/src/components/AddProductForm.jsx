import { useState, useRef } from "react";
import productService from "../api/productService";
import { toast } from "sonner";

const AddProductForm = ({ onProductAdded }) => {
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

  const lightDEMap = {
    sun: "sonne",
    "half-shadow": "halb-schatten",
    shadow: "schatten",
  };

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  const commonNameRef = useRef(null);

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
    // create object URLs for previews and store them
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove a selected image
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    // clear native file input so same file can be re-selected if desired
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side validation for required fields
    const missing = [];
    if (!formData.common_name_en) missing.push("common_name_en");
    if (!formData.description_en) missing.push("description_en");
    if (!formData.description_de) missing.push("description_de");
    if (!formData.height) missing.push("height");
    if (!formData.diameter) missing.push("diameter");
    if (!formData.hardiness) missing.push("hardiness");
    if (!formData.light) missing.push("light");
    if (!formData.color) missing.push("color");
    if (images.length < 1) missing.push("images");

    if (missing.length > 0) {
      setErrors(missing);
      // focus first invalid field
      const first = missing[0];
      if (first === "common_name_en" && commonNameRef.current) {
        commonNameRef.current.focus();
      }
      return;
    }
    setErrors([]);

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
      formDataToSend.append("common_name_en", formData.common_name_en);
      formDataToSend.append("common_name_de", formData.common_name_de);
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
      setImages([]);
      // revoke previews and clear them
      previews.forEach((p) => URL.revokeObjectURL(p));
      setPreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

      {/* Common Name (EN/DE) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="common_name_en" className="block text-sm font-medium">
            Common Name (EN) <span className="text-red-500">*</span>
          </label>
          <input
            id="common_name_en"
            ref={commonNameRef}
            type="text"
            name="common_name_en"
            value={formData.common_name_en}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. Ficus lyrata"
            required
            aria-required="true"
            aria-invalid={errors.includes("common_name_en")}
            aria-describedby={
              errors.includes("common_name_en")
                ? "err_common_name_en"
                : undefined
            }
          />
          {errors.includes("common_name_en") && (
            <p id="err_common_name_en" className="mt-1 text-sm text-red-600">
              Common name (EN) is required.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="common_name_de" className="block text-sm font-medium">
            Common Name (DE)
          </label>
          <input
            id="common_name_de"
            type="text"
            name="common_name_de"
            value={formData.common_name_de}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="z.B. Ficus lyrata"
            aria-invalid={errors.includes("common_name_de")}
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="description_en" className="block text-sm font-medium">
            Description (EN) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description_en"
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="Short description in English"
            required
            aria-required="true"
            aria-invalid={errors.includes("description_en")}
          />
          {errors.includes("description_en") && (
            <p className="mt-1 text-sm text-red-600">
              English description is required.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="description_de" className="block text-sm font-medium">
            Description (DE) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description_de"
            name="description_de"
            value={formData.description_de}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="Kurze Beschreibung auf Deutsch"
            required
            aria-required="true"
            aria-invalid={errors.includes("description_de")}
          />
          {errors.includes("description_de") && (
            <p className="mt-1 text-sm text-red-600">
              German description is required.
            </p>
          )}
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Height (cm) <span className="text-red-500">*</span>
          </label>
          <input
            id="height"
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. 10-20"
            required
            aria-invalid={errors.includes("height")}
          />
          {errors.includes("height") && (
            <p className="mt-1 text-sm text-red-600">Height is required.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">
            Diameter (cm) <span className="text-red-500">*</span>
          </label>
          <input
            id="diameter"
            type="text"
            name="diameter"
            value={formData.diameter}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. 5-10"
            required
            aria-invalid={errors.includes("diameter")}
          />
          {errors.includes("diameter") && (
            <p className="mt-1 text-sm text-red-600">Diameter is required.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">
            Hardiness (°C) <span className="text-red-500">*</span>
          </label>
          <input
            id="hardiness"
            type="text"
            name="hardiness"
            value={formData.hardiness}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. 3-5"
            required
            aria-invalid={errors.includes("hardiness")}
          />
          {errors.includes("hardiness") && (
            <p className="mt-1 text-sm text-red-600">Hardiness is required.</p>
          )}
        </div>
      </div>

      {/* Light */}

      <div>
        <label className="block text-sm font-medium">
          Light <span className="text-red-500">*</span>
        </label>
        <select
          id="light"
          name="light"
          value={formData.light}
          onChange={(e) => setFormData({ ...formData, light: e.target.value })}
          className="w-full rounded border p-2"
          required
          aria-required="true"
          aria-invalid={errors.includes("light")}
        >
          <option value="sun">Sun</option>
          <option value="half-shadow">Half-Shadow</option>
          <option value="shadow">Shadow</option>
        </select>
        <p className="mt-1 text-gray-500">DE: {lightDEMap[formData.light]}</p>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <label htmlFor="color" className="block font-medium text-text">
          Select Color
        </label>
        <div className="mt-1 flex gap-2">
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => setFormData({ ...formData, color: c })}
              className={`h-8 w-8 cursor-pointer rounded-full border-2 transition-all duration-200 ${
                formData.color === c ? "scale-110 border-black" : "border-muted"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        {errors.includes("color") && (
          <p className="mt-1 text-sm text-red-600">Color is required.</p>
        )}
      </div>

      {/* Images */}
      <div className="mb-4">
        <label htmlFor="images" className="block font-medium text-gray-700">
          Images (1-3) <span className="text-red-500">*</span>
        </label>
        <input
          id="images"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full rounded border p-2"
          aria-required="true"
          aria-invalid={errors.includes("images")}
        />
        {errors.includes("images") && (
          <p className="mt-1 text-sm text-red-600">
            Please add at least one image (max 3).
          </p>
        )}
        <div className="mt-2 flex flex-row gap-2 overflow-x-auto">
          {previews.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="h-16 w-16 rounded object-cover"
              />
              <button
                type="button"
                aria-label={`Remove image ${index + 1}`}
                className="absolute right-1/2 top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white transition hover:bg-red-600"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* aria-live region for form-level errors */}
      <div aria-live="polite" className="sr-only" role="status">
        {errors.length > 0 && `Please correct ${errors.length} field(s).`}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-26 flex rounded px-4 py-2 text-on-dark ${
          isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-primary hover:bg-primary-dark"
        }`}
      >
        {isLoading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;

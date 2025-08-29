import { useState, useRef } from "react";
import employeeService from "../services/employeeService";

const AddEmployeeForm = ({ onEmployeeAdded }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role_en: "",
    role_de: "",
    department_en: "",
    department_de: "",
    telephone: "",
    profilePicture: null, // store file object
  });

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const handleRemoveSelectedImage = () => {
    setFormData((prev) => ({ ...prev, profilePicture: null }));
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation for required fields
    const missing = [];
    if (!formData.firstname) missing.push("First name");
    if (!formData.lastname) missing.push("Last name");
    if (!formData.email) missing.push("Email");
    if (!formData.role_en) missing.push("Role (EN)");
    if (!formData.role_de) missing.push("Role (DE)");
    if (!formData.department_en) missing.push("Department (EN)");
    if (!formData.department_de) missing.push("Department (DE)");
    if (!formData.telephone) missing.push("Telephone");
    if (!formData.profilePicture) missing.push("Profile Picture");

    if (missing.length > 0) {
      alert("Please provide required fields: " + missing.join(", "));
      return;
    }

    try {
      setIsLoading(true);

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profilePicture") {
          if (formData[key])
            formDataToSend.append("profilePicture", formData[key]); // Correct field name
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const addedEmployee =
        await employeeService.createEmployee(formDataToSend);
      onEmployeeAdded(addedEmployee);

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        role_en: "",
        role_de: "",
        department_en: "",
        department_de: "",
        telephone: "",
        profilePicture: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert(error.response?.data?.error || "Failed to add employee.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded bg-white p-6 shadow-md"
      encType="multipart/form-data"
    >
      <h2 className="text-lg font-semibold">Add New Employee</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="First name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="Last name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="email@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Role (EN) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="role_en"
            value={formData.role_en}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. Engineer"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Role (DE) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="role_de"
            value={formData.role_de}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="z. B. Ingenieur"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Department (EN) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="department_en"
            value={formData.department_en}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. R&D"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Department (DE) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="department_de"
            value={formData.department_de}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="z. B. F&E"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Telephone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full rounded border p-2"
            placeholder="e.g. +49 1234 567890"
            required
          />
        </div>
      </div>

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium">
          Profile Picture <span className="text-red-500">*</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded border p-2"
          required
          aria-required="true"
        />

        {preview && (
          <div className="mt-2 flex gap-2">
            <div className="relative">
              <img
                src={preview}
                alt="preview"
                className="h-16 w-16 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveSelectedImage}
                className="absolute right-1/2 top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white transition hover:bg-red-600"
                aria-label="Remove selected image"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-26 flex rounded px-4 py-2 text-white ${
          isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isLoading ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
};

export default AddEmployeeForm;

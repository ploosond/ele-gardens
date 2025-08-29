import { useState, useEffect, useRef } from "react";
import employeeService from "../../services/employeeService";

const EditEmployeeForm = ({ employee, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role_en: "",
    role_de: "",
    department_en: "",
    department_de: "",
    telephone: "",
    email: "",
    profilePictureFile: null,
    profilePictureUrl: "", // for preview only
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstname: employee.firstname || "",
        lastname: employee.lastname || "",
        email: employee.email || "",
        role_en: employee.role?.en || "",
        role_de: employee.role?.de || "",
        department_en: employee.department?.en || "",
        department_de: employee.department?.de || "",
        telephone: employee.telephone || "",
        profilePictureUrl: employee.profilePicture?.url || "",
      });
      setErrors({});
    }
    return () => {
      // cleanup any created object URL
      if (formData.profilePictureFile && formData.profilePictureUrl) {
        try {
          URL.revokeObjectURL(formData.profilePictureUrl);
        } catch (e) {}
      }
    };
  }, [employee]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePictureFile") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          profilePictureFile: file,
          profilePictureUrl: URL.createObjectURL(file), // preview
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    if (!validate()) {
      alert("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profilePictureFile" && formData[key]) {
          formDataToSend.append("profilePicture", formData[key]); // Correct field name for Multer
        } else if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key].toString()); // Ensure all values are strings
        }
      });

      // If no new file was uploaded, include the existing profilePicture info
      if (!formData.profilePictureFile) {
        const existing = employee?.profilePicture || null;
        if (existing) {
          formDataToSend.append("profilePicture", JSON.stringify(existing));
        }
      }

      console.log("FormData before submission:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const updatedEmployee = await employeeService.updateEmployee(
        employee._id,
        formDataToSend,
      );

      onUpdate(updatedEmployee);
      setFormData((prev) => ({ ...prev, profilePictureFile: null }));
    } catch (error) {
      console.error("Failed to update employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    firstname,
    lastname,
    role_en,
    role_de,
    department_en,
    department_de,
    telephone,
    email,
    profilePictureUrl,
  } = formData;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-6 max-w-3xl rounded bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-700">
        Edit Employee
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstname"
            className="mb-1 block font-medium text-gray-700"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            placeholder="First Name"
            required
            className={`input w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.firstname}
            aria-describedby={errors.firstname ? "firstname-error" : undefined}
          />
          {errors.firstname && (
            <p id="firstname-error" className="mt-1 text-sm text-red-600">
              {errors.firstname}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastname"
            className="mb-1 block font-medium text-gray-700"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className={`input w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.lastname ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.lastname}
            aria-describedby={errors.lastname ? "lastname-error" : undefined}
          />
          {errors.lastname && (
            <p id="lastname-error" className="mt-1 text-sm text-red-600">
              {errors.lastname}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="mb-1 block font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
            className={`input w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Role (EN) */}
        <div>
          <label
            htmlFor="role_en"
            className="mb-1 block font-medium text-gray-700"
          >
            Role (EN) <span className="text-red-500">*</span>
          </label>
          <input
            id="role_en"
            name="role_en"
            value={role_en}
            onChange={handleChange}
            placeholder="Role in English"
            required
            className={`input w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.role_en ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.role_en}
            aria-describedby={errors.role_en ? "role_en-error" : undefined}
          />
          {errors.role_en && (
            <p id="role_en-error" className="mt-1 text-sm text-red-600">
              {errors.role_en}
            </p>
          )}
        </div>

        {/* Role (DE) */}
        <div>
          <label
            htmlFor="role_de"
            className="mb-1 block font-medium text-gray-700"
          >
            Role (DE) <span className="text-red-500">*</span>
          </label>
          <input
            id="role_de"
            name="role_de"
            value={role_de}
            onChange={handleChange}
            placeholder="Rolle auf Deutsch"
            required
            className={`input w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.role_de ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.role_de}
            aria-describedby={errors.role_de ? "role_de-error" : undefined}
          />
          {errors.role_de && (
            <p id="role_de-error" className="mt-1 text-sm text-red-600">
              {errors.role_de}
            </p>
          )}
        </div>

        {/* Department (EN) */}
        <div>
          <label
            htmlFor="department_en"
            className="mb-1 block font-medium text-gray-700"
          >
            Department (EN) <span className="text-red-500">*</span>
          </label>
          <input
            id="department_en"
            name="department_en"
            value={department_en}
            onChange={handleChange}
            placeholder="Department in English"
            required
            className={`input w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.department_en ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.department_en}
            aria-describedby={
              errors.department_en ? "department_en-error" : undefined
            }
          />
          {errors.department_en && (
            <p id="department_en-error" className="mt-1 text-sm text-red-600">
              {errors.department_en}
            </p>
          )}
        </div>

        {/* Department (DE) */}
        <div>
          <label
            htmlFor="department_de"
            className="mb-1 block font-medium text-gray-700"
          >
            Department (DE) <span className="text-red-500">*</span>
          </label>
          <input
            id="department_de"
            name="department_de"
            value={department_de}
            onChange={handleChange}
            placeholder="Abteilung auf Deutsch"
            required
            className={`input w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.department_de ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.department_de}
            aria-describedby={
              errors.department_de ? "department_de-error" : undefined
            }
          />
          {errors.department_de && (
            <p id="department_de-error" className="mt-1 text-sm text-red-600">
              {errors.department_de}
            </p>
          )}
        </div>

        {/* Telephone */}
        <div className="sm:col-span-2">
          <label
            htmlFor="telephone"
            className="mb-1 block font-medium text-gray-700"
          >
            Telephone
          </label>
          <input
            id="telephone"
            name="telephone"
            value={telephone}
            onChange={handleChange}
            placeholder="Telephone"
            className="input w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Profile Picture Upload */}
        <div className="sm:col-span-2">
          <label
            htmlFor="profilePictureFile"
            className="mb-1 block font-medium text-gray-700"
          >
            Upload Profile Picture
          </label>
          <input
            id="profilePictureFile"
            name="profilePictureFile"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Preview */}
        <div className="mt-2 flex items-center gap-4">
          {profilePictureUrl && (
            <div className="relative">
              <img
                src={profilePictureUrl}
                alt={firstname}
                className="h-16 w-16 rounded-full border border-gray-300 object-cover"
              />
              {/* show remove button when a new file is selected */}
              {formData.profilePictureFile && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      profilePictureFile: null,
                      profilePictureUrl: employee?.profilePicture?.url || "",
                    }));
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute right-1/2 top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white hover:bg-red-600"
                  aria-label="Remove selected image"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded px-6 py-2 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isSubmitting
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save"}
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

export default EditEmployeeForm;

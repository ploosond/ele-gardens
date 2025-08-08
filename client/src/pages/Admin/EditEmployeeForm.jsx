import { useState, useEffect } from "react";
import employeeService from "../../services/employeeService";

const EditEmployeeForm = ({ employee, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    department: "",
    telephone: "",
    email: "",
    profilePictureFile: null,
    profilePictureUrl: "", // for preview only
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstname: employee.firstname || "",
        lastname: employee.lastname || "",
        role: employee.role || "",
        department: employee.department || "",
        telephone: employee.telephone || "",
        email: employee.email || "",
        profilePictureFile: null,
        profilePictureUrl: employee.profilePicture?.url || "",
      });
      setErrors({});
    }
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
    if (!validate()) return;

    try {
      const formPayload = new FormData();
      formPayload.append("firstname", formData.firstname);
      formPayload.append("lastname", formData.lastname);
      formPayload.append("role", formData.role);
      formPayload.append("department", formData.department);
      formPayload.append("telephone", formData.telephone);
      formPayload.append("email", formData.email);

      if (formData.profilePictureFile) {
        formPayload.append("profilePicture", formData.profilePictureFile);
      }

      // Use employee._id here
      const updatedEmployee = await employeeService.updateEmployee(
        employee._id,
        formPayload,
      );

      onUpdate(updatedEmployee);
    } catch (error) {
      console.error(
        "Failed to update employee:",
        error.response?.data || error.message || error,
      );
    }
  };

  const {
    firstname,
    lastname,
    role,
    department,
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

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="mb-1 block font-medium text-gray-700"
          >
            Role
          </label>
          <input
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            placeholder="Role"
            className="input w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Department */}
        <div>
          <label
            htmlFor="department"
            className="mb-1 block font-medium text-gray-700"
          >
            Department
          </label>
          <input
            id="department"
            name="department"
            value={department}
            onChange={handleChange}
            placeholder="Department"
            className="input w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Preview */}
        <div className="flex items-center gap-4">
          {profilePictureUrl && (
            <img
              src={profilePictureUrl}
              alt={firstname}
              className="h-16 w-16 rounded-full border border-gray-300 object-cover"
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="submit"
          className="rounded bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
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

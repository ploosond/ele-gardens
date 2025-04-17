import { useState } from "react";
import employeeService from "../services/employeeService";

const AddEmployeeForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    department: "",
    telephone: "",
    profilePicture: { url: "", altText: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (field, value) => {
    setFormData({
      ...formData,
      profilePicture: { ...formData.profilePicture, [field]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedEmployee = await employeeService.createEmployee(formData);
      onEmployeeAdded(addedEmployee); // Notify parent component
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        department: "",
        telephone: "",
        profilePicture: { url: "", altText: "" },
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded bg-white p-6 shadow-md"
    >
      <h2 className="text-lg font-semibold">Add New Employee</h2>

      {/* General Information Section */}
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
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Department <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded border p-2"
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
            required
          />
        </div>
      </div>

      {/* Profile Picture Section */}
      <div>
        <h3 className="text-sm font-medium">Profile Picture</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Picture URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.profilePicture.url}
              onChange={(e) =>
                handleProfilePictureChange("url", e.target.value)
              }
              className="w-full rounded border p-2"
              placeholder="Enter profile picture URL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Alt Text</label>
            <input
              type="text"
              value={formData.profilePicture.altText}
              onChange={(e) =>
                handleProfilePictureChange("altText", e.target.value)
              }
              className="w-full rounded border p-2"
              placeholder="Enter alt text for the picture"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;

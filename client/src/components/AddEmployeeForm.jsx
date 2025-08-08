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
    profilePicture: null, // store file object
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const addedEmployee =
        await employeeService.createEmployee(formDataToSend);
      onEmployeeAdded(addedEmployee);

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        department: "",
        telephone: "",
        profilePicture: null,
      });
    } catch (error) {
      console.error("Error adding employee:", error);
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

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium">
          Profile Picture <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded border p-2"
        />
      </div>

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

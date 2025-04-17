import React, { useEffect, useState } from "react";
import employeeService from "../../services/employeeService";
import AddEmployeeForm from "../../components/AddEmployeeForm";

const EmployeesAdmin = () => {
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = async (employee, employeeId) => {
    if (window.confirm(`Are you sure you want to delete ${employee}?`)) {
      await employeeService.deleteEmployee(employeeId);
      setMembers(members.filter((m) => m._id !== employeeId));
    }
  };

  const handleEmployeeAdded = (newEmployee) => {
    setMembers((prevMembers) => [...prevMembers, newEmployee]);
    setShowAddForm(false); // Hide the form after adding
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getAllEmployees();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 flex flex-row-reverse items-center justify-between">
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          {showAddForm ? "Cancel" : "Add +"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
        </div>
      )}

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-3">Email</th>
            <th className="border p-3">First Name</th>
            <th className="border p-3">Last Name</th>
            <th className="border p-3">Role</th>
            <th className="border p-3">Department</th>
            <th className="border p-3">Telephone</th>
            <th className="border p-3">Profile</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id} className="hover:bg-gray-100">
              <td className="border p-3">{m.email}</td>
              <td className="border p-3">{m.firstname}</td>
              <td className="border p-3">{m.lastname}</td>
              <td className="border p-3">{m.role}</td>
              <td className="border p-3">{m.department}</td>
              <td className="border p-3">{m.telephone}</td>
              <td className="flex gap-2 border p-3">
                <img
                  className="h-16 w-16 rounded object-cover"
                  src={m.profilePicture.url}
                  alt={m.profilePicture.altText || "Profile Picture"}
                />
              </td>
              <td className="flex gap-2 border p-3">
                {/* <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
                  Update
                </button> */}
                <button
                  onClick={() => handleDelete(m.firstname, m._id)}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesAdmin;

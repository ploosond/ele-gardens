import { useEffect, useState } from "react";
import employeeService from "../../services/employeeService";
import AddEmployeeForm from "../../components/AddEmployeeForm";
import EditEmployeeForm from "./EditEmployeeForm";

const EmployeesAdmin = () => {
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleDelete = async (employee, employeeId) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${employee.firstname} ${employee.lastname}?`,
      )
    ) {
      await employeeService.deleteEmployee(employeeId);
      setMembers(members.filter((m) => m._id !== employeeId));
    }
  };

  const handleEmployeeAdded = (newEmployee) => {
    setMembers((prevMembers) => [...prevMembers, newEmployee]);
    setShowAddForm(false);
  };

  const handleEmployeeUpdated = async (updatedEmployee) => {
    try {
      const data = await employeeService.updateEmployee(
        updatedEmployee._id,
        updatedEmployee,
      );

      setMembers((prevMembers) =>
        prevMembers.map((emp) => (emp._id === data._id ? data : emp)),
      );

      setEditEmployee(null);
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
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
      <div className="mb-6 flex flex-row-reverse items-center justify-between border-b border-gray-300 pb-4">
        <button
          onClick={() => {
            setShowAddForm((prev) => !prev);
            setEditEmployee(null); // close edit form if open when toggling add form
          }}
          className="rounded bg-green-600 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-expanded={showAddForm}
          aria-controls="addEmployeeForm"
        >
          {showAddForm ? "Cancel" : "Add +"}
        </button>
      </div>

      {showAddForm && !editEmployee && (
        <div
          id="addEmployeeForm"
          className="mb-6 rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
        >
          <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
        </div>
      )}

      {editEmployee && (
        <div className="mb-6 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
          <EditEmployeeForm
            employee={editEmployee}
            onUpdate={handleEmployeeUpdated}
            onCancel={() => setEditEmployee(null)}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {[
                "Email",
                "First Name",
                "Last Name",
                "Role",
                "Department",
                "Telephone",
                "Profile",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="border border-gray-300 p-3 text-left align-middle"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id} className="transition-colors hover:bg-gray-50">
                <td className="border border-gray-300 p-3 align-middle">
                  {m.email}
                </td>
                <td className="border border-gray-300 p-3 align-middle">
                  {m.firstname}
                </td>
                <td className="border border-gray-300 p-3 align-middle">
                  {m.lastname}
                </td>
                <td className="border border-gray-300 p-3 align-middle">
                  {m.role}
                </td>
                <td className="border border-gray-300 p-3 align-middle">
                  {m.department}
                </td>
                <td className="border border-gray-300 p-3 align-middle">
                  {m.telephone}
                </td>
                <td className="border border-gray-300 p-3 align-middle">
                  <img
                    className="mx-auto h-14 w-14 rounded-full object-cover"
                    src={m.profilePicture?.url || "/default-profile.png"}
                    alt={m.profilePicture?.altText || "Profile Picture"}
                  />
                </td>
                <td className="flex justify-center gap-3 border border-gray-300 p-3 align-middle">
                  <button
                    onClick={() => {
                      setEditEmployee(m);
                      setShowAddForm(false);
                      scrollTo(0, 0);
                    }}
                    className="rounded bg-blue-600 px-4 py-1 font-medium text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label={`Edit employee ${m.firstname} ${m.lastname}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m, m._id)}
                    className="rounded bg-red-600 px-4 py-1 font-medium text-white shadow transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label={`Delete employee ${m.firstname} ${m.lastname}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesAdmin;

import { Link, Outlet, useNavigate } from "react-router";
import HeroSection from "../components/HeroSection";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user details from localStorage
    window.localStorage.removeItem("loggedUser");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      <HeroSection
        title="Admin"
        highlight="Panel"
        description="You can read, create, update, and delete the Products and Employees"
      />
      <div className="m-2 flex items-center justify-between">
        <div className="flex gap-4 text-lg font-semibold text-gray-600">
          <Link
            className="rounded-md bg-green-600 px-4 py-3 text-white hover:bg-green-700"
            to="/admin/products"
          >
            Products
          </Link>
          <Link
            className="rounded-md bg-green-600 px-4 py-3 text-white hover:bg-green-700"
            to="/admin/employees"
          >
            Employees
          </Link>
        </div>
        <button
          className="rounded-md bg-red-500 px-4 py-3 text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Admin;

import { Link, Outlet, useNavigate } from "react-router";
import HeroSection from "../../components/HeroSection";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { userData, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!userData || userData.user.role !== "admin") {
    return (
      <div className="bg-muted flex h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-lg text-gray-700">
            You do not have the necessary permissions to access this page.
          </p>
          <button
            className="text-on-dark mt-6 rounded-md bg-red-500 px-6 py-3 hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <div className="text-text flex gap-4 text-lg font-semibold">
          <Link
            className="text-on-dark hover:bg-primary-dark rounded-md bg-primary px-4 py-3"
            to="/admin/products"
          >
            Products
          </Link>
          <Link
            className="text-on-dark hover:bg-primary-dark rounded-md bg-primary px-4 py-3"
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

export default AdminLayout;

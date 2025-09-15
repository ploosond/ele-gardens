import {
  Link,
  redirect,
  useNavigate,
  createFileRoute,
  Outlet,
} from "@tanstack/react-router";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

export const Route = createFileRoute("/admin")({
  // beforeLoad guards the route
  beforeLoad: ({ context, location }) => {
    const { auth } = context;
    //   // If auth is still loading (checking localStorage), don't redirect yet
    if (auth.loading) return;

    //   // If user is not logged in → redirect to login with ?redirect
    if (!auth.userData) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    //   // If user is logged in but not admin → redirect to home
    if (auth.userData.user.role !== "admin") {
      throw redirect({ to: "/", replace: true });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation - Always visible */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Link
              className="rounded-md bg-green-600 px-4 py-3 text-white font-semibold hover:bg-green-700 [&.active]:bg-green-700"
              to="/admin/products"
              activeProps={{
                className: "rounded-md bg-green-700 px-4 py-3 text-white font-semibold"
              }}
            >
              Products
            </Link>
            <Link
              className="rounded-md bg-green-600 px-4 py-3 text-white font-semibold hover:bg-green-700 [&.active]:bg-green-700"
              to="/admin/employees"
              activeProps={{
                className: "rounded-md bg-green-700 px-4 py-3 text-white font-semibold"
              }}
            >
              Employees
            </Link>
          </div>
          <button
            className="rounded-md bg-red-500 px-4 py-3 text-white font-semibold hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content Area - Child routes render here */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
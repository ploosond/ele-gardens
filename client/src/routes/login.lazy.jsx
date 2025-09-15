import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { useContext, useState } from "react";
import userService from "../api/userService";
import { AuthContext } from "../context/auth/AuthContext";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.login(formData);
      login(user);
      setFormData({ username: "", password: "" });

      if (search?.redirect) {
        router.history.push(search.redirect);
      } else {
        navigate({ to: "/admin" });
      }
    } catch (error) {
      let message = "Wrong credentials";
      if (error.response?.status === 401) {
        message = "Invalid username or password.";
      } else if (error.message) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-md border p-2 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border p-2 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-on-dark hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

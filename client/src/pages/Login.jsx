import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import userService from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  const { userData, login } = useContext(AuthContext);

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
      navigate("/admin");
    } catch (error) {
      let message = "Wrong credentials";
      if (error.response && error.response.status === 401) {
        message = "Invalid username or password.";
      } else if (error.message) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  useEffect(() => {
    if (userData) {
      navigate("/admin", { replace: true });
    }
  }, [userData, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-center text-sm text-red-500">
              {errorMessage}
            </div>
          )}
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
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        {/* <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Sign up
            </a>
          </div> */}
      </div>
    </div>
  );
};

export default Login;

import { createContext, useEffect, useState } from "react";
import productService from "../services/productService";
import employeeService from "../services/employeeService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUserJSON = JSON.parse(
      window.localStorage.getItem("loggedUser"),
    );
    if (loggedUserJSON) {
      setUserData(loggedUserJSON);
      productService.setToken(loggedUserJSON.token);
      employeeService.setToken(loggedUserJSON.token);
    }

    setLoading(false);
  }, []);

  const login = (userDetails) => {
    window.localStorage.setItem("loggedUser", JSON.stringify(userDetails));
    setUserData(userDetails);
    productService.setToken(userDetails.token);
    employeeService.setToken(userDetails.token);
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

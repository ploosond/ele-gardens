import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return userData ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

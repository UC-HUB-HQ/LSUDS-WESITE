import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../context/User";

const ProtectedRoute = ({ children }) => {
  const user = useUser();

  return user.current ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;

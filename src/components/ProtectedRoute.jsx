import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../context/User";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { currentUser, loading  } = useUser();

  if (loading) {
    return (
      <center>
        <Loader />
      </center>
    )
  }
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;

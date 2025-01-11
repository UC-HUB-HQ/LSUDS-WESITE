import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../context/User";

const ProtectedRoute = () => {
  const { currentUser, loading  } = useUser();

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;

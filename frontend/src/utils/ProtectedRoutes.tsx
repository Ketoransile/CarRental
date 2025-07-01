import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { LoadingSpinner } from "../components/LoadingSpinner";
const ProtectedRoutes = () => {
  const { user, isLoading } = useAuthStore();
  if (isLoading) {
    return <LoadingSpinner size={20} />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

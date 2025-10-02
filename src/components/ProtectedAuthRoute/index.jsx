import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAuthRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const roleId = localStorage.getItem("roleId");
    const roleENV = import.meta.env.VITE_ADMIN_ROLE_ID;
    if (roleId === roleENV) {
      return <Navigate to="/admin/overview" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
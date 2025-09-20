import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute({ roles = [] }) {
  const roleId = localStorage.getItem("roleId");

  if (!roleId) {
    return <Navigate to="/auth/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(roleId)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
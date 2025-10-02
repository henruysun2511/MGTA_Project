import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute({ children}) {
  const roleId = localStorage.getItem("roleId");
  const roleENV = import.meta.env.VITE_ROLE_ID;

  if (roleId !== roleENV) {
    return <Navigate to="/auth/login" replace />;
  }
  return children ? children : <Outlet />;
}
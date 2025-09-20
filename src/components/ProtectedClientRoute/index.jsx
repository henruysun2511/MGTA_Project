import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedClientRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  return children ? children : <Outlet />;
}
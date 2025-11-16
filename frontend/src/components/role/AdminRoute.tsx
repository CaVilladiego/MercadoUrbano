import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { JSX } from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

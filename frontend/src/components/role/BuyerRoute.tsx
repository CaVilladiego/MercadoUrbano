import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { JSX } from "react";

export default function BuyerRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);

  if (!user || user.role !== "buyer") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

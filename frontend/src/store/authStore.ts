import { create } from "zustand";

type Role = "buyer" | "seller" | "admin";

type BackendUser = {
  id: string;
  email: string;
  name?: string;
  role: "Cliente" | "Vendedor" | "Administrador";
};

type User = {
  id: string;
  email: string;
  name?: string;
  role: Role;
};

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, backendUser: BackendUser) => void;
  logout: () => void;
}

/**
 * Convierte los roles del backend a los que usa el frontend.
 * Backend: Cliente, Vendedor, Administrador
 * Frontend: buyer, seller, admin
 */
function normalizeRole(backendRole: BackendUser["role"]): Role {
  switch (backendRole) {
    case "Cliente":
      return "buyer";
    case "Vendedor":
      return "seller";
    case "Administrador":
      return "admin";
    default:
      throw new Error(`Unhandled backend role: ${backendRole}`);
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,

  setAuth: (token, backendUser) => {
    const normalizedUser: User = {
      id: backendUser.id,
      email: backendUser.email,
      name: backendUser.name,
      role: normalizeRole(backendUser.role),
    };

    localStorage.setItem("token", token);
    set({ token, user: normalizedUser });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));

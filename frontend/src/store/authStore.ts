import { create } from "zustand";

type Role = "buyer" | "seller" | "admin";

type BackendUser = {
  id: string;
  email: string;
  name?: string;
  Rol: "Cliente" | "Vendedor" | "Administrador"; // <-- CORREGIDO
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

/* Normalizar roles */
function normalizeRole(role: BackendUser["Rol"]): Role {
  switch (role) {
    case "Cliente":
      return "buyer";
    case "Vendedor":
      return "seller";
    case "Administrador":
      return "admin";
    default:
      throw new Error(`Unhandled backend role: ${role}`);
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),

  // Cargar usuario desde localStorage si existe
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,

  setAuth: (token, backendUser) => {
    const normalizedUser: User = {
      id: backendUser.id,
      email: backendUser.email,
      name: backendUser.name,
      role: normalizeRole(backendUser.Rol), // <-- CORREGIDO
    };

    // Persistencia
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    set({ token, user: normalizedUser });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

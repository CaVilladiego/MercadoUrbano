import api from "./axiosInstance";

console.log("BASE URL:", import.meta.env.VITE_API_AUTH);

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  PrimerNombre: string;
  SegundoNombre?: string;
  Apellido: string;
  email: string;
  password: string;
  Telefono: string;
  Direccion: string;
  Ciudad: string;
  Departamento: string;
  Pais: string;
  CodigoPostal?: string;
  Referencia?: string;
  Rol?: string;
  Tiendas?: Array<{
    name: string;
    telefono: string;
    email?: string;
    description?: string;
    direccion?: string;
    ciudad?: string;
    departamento?: string;
    pais?: string;
    codigoPostal?: string;
    referencia?: string;
  }>;
}

/* Login */
export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data; // { token, user }
};

/* Registro */
export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};


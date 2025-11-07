import api from "./axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data; // { token, user }
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data; // { token, user }
};

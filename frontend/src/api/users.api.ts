import api from "./axiosInstance";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users");
  return data;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const updateUser = async (id: string, payload: Partial<User>) => {
  const { data } = await api.patch(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`);
};

import axiosAuth from "./axiosAuth";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosAuth.get("/users");
  return data;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await axiosAuth.get(`/users/${id}`);
  return data;
};

export const updateUser = async (id: string, payload: Partial<User>) => {
  const { data } = await axiosAuth.patch(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: string) => {
  await axiosAuth.delete(`/users/${id}`);
};

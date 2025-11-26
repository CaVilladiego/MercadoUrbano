import axiosAuth from "./axiosAuth";

export interface Store {
  id: string;
  name: string;
  address: string;
  phone?: string;
  ownerId: string;
}

export const getStores = async (ownerId: string): Promise<Store[]> => {
  const { data } = await axiosAuth.get<Store[]>(`/users/${ownerId}/stores`);
  return data;
};

export const getStore = async (
  ownerId: string,
  storeId: string
): Promise<Store> => {
  const { data } = await axiosAuth.get<Store>(`/users/${ownerId}/stores/${storeId}`);
  return data;
};

export const createStore = async (
  ownerId: string,
  payload: Partial<Store>
): Promise<Store> => {
  const { data } = await axiosAuth.post<Store>(`/users/${ownerId}/stores`, payload);
  return data;
};

export const updateStore = async (
  ownerId: string,
  storeId: string,
  payload: Partial<Store>
): Promise<Store> => {
  const { data } = await axiosAuth.patch<Store>(`/users/${ownerId}/stores/${storeId}`, payload);
  return data;
};

export const deleteStore = async (
  ownerId: string,
  storeId: string
): Promise<void> => {
  await axiosAuth.delete(`/users/${ownerId}/stores/${storeId}`);
};

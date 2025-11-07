import api from "./axiosInstance";

export interface Store {
  id: string;
  name: string;
  address: string;
  phone?: string;
  ownerId: string;
}

export const getStores = async (ownerId: string): Promise<Store[]> => {
  const { data } = await api.get(`/users/${ownerId}/stores`);
  return data;
};

export const getStore = async (ownerId: string, storeId: string): Promise<Store> => {
  const { data } = await api.get(`/users/${ownerId}/stores/${storeId}`);
  return data;
};

export const createStore = async (ownerId: string, payload: Partial<Store>): Promise<Store> => {
  const { data } = await api.post(`/users/${ownerId}/stores`, payload);
  return data;
};

export const updateStore = async (
  ownerId: string,
  storeId: string,
  payload: Partial<Store>
): Promise<Store> => {
  const { data } = await api.patch(`/users/${ownerId}/stores/${storeId}`, payload);
  return data;
};

export const deleteStore = async (ownerId: string, storeId: string): Promise<void> => {
  await api.delete(`/users/${ownerId}/stores/${storeId}`);
};

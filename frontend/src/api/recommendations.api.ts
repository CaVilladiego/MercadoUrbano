import axiosRecom from "./axiosRecommendations";

export interface CreateRecommendationPayload {
  text: string;
}

export interface Recommendation {
  id: string;
  userId: string;
  text: string;
  response: string;
  createdAt: string;
}

export const createRecommendation = async (
  payload: CreateRecommendationPayload
): Promise<Recommendation> => {
  const { data } = await axiosRecom.post<Recommendation>("/recommendations", payload);
  return data;
};

export const generateNearbyStores = async (
  userId: string
): Promise<Recommendation> => {
  const { data } = await axiosRecom.post<Recommendation>(`/recommendations/${userId}`);
  return data;
};

export const getAllRecommendations = async (): Promise<Recommendation[]> => {
  const { data } = await axiosRecom.get<Recommendation[]>("/recommendations");
  return data;
};

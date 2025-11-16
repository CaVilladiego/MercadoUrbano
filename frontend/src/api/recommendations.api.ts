import api from "./axiosInstance";

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

export async function createRecommendation(payload: CreateRecommendationPayload) {
  const res = await api.post("/recommendations", payload);
  return res.data;
}

export async function generateNearbyStores(userId: string) {
  const res = await api.post(`/recommendations/${userId}`);
  return res.data;
}

export async function getAllRecommendations() {
  const res = await api.get("/recommendations");
  return res.data;
}

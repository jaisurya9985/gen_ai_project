import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const generatePlan = async (planData) => {
  const response = await api.post("/generate-plan", planData);
  return response.data;
};

export default api;

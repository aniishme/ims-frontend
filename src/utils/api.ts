import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use((response) => {
  if (response.status === 401 || response.status === 403) {
    const res = api.get("/auth/logout");
    return res;
  }

  return response;
});

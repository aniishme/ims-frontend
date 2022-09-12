import { api } from "../utils/api";

type LoginData = {
  username: string;
  password: string;
};

export const loginHandler = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);

  return res;
};

export const isLoggedIn = async () => {
  return await api.get("/auth/me");
};

export const logout = async () => {
  return await api.get("/auth/logout");
};

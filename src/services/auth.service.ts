import { api } from "../utils/api";

type LoginData = {
  username: string;
  password: string;
};
export type RegisterData = {
  name: string;
  username: string;
  password: string;
  role: string;
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

export const createUser = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data);
  return res;
};

export const getAllUsers = async () => {
  const res = await api.get("/auth/users");
  return res;
};

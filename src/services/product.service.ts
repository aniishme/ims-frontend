import { api } from "../utils/api";

export const getItem = async () => {
  const res = await api.get("/item/");

  return res;
};

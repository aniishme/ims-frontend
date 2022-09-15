import { api } from "../utils/api";

export type ItemRequestType = {
  name: string;
  price: number;
  image: string;
  categoryId: string;
};

export const getItem = async () => {
  const res = await api.get("/item/");

  return res;
};

export const createItem = async (data: ItemRequestType) => {
  const res = await api.post("/item/", data);

  return res;
};

export const deleteItem = async (data: { id: string }) => {
  const res = await api.delete(`/item/${data.id}`);

  return res;
};

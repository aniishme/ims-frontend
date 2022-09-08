import { api } from "../utils/api";

export type CategoryData = {
  name: string;
};

type CategoryDataWithId = CategoryData & {
  id: number;
};

export const getCategory = async () => {
  const res = await api.get("/category/");

  return res;
};

export const addCategory = async (data: CategoryData) => {
  const res = api.post("/category/", data);

  return res;
};

export const editCategory = async (data: CategoryDataWithId) => {
  const res = api.put(`/category/${data.id}`, {
    name: data.name,
  });

  return res;
};

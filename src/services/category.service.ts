import { api } from "../utils/api";

export type CategoryData = {
  name: string;
};

export type IDType = {
  id: string | undefined;
};

type CategoryDataWithId = CategoryData & IDType;

export const getCategory = async () => {
  const res = await api.get("/category/");

  return res;
};

export const getCategoryById = async (data: IDType) => {
  const res = await api.get(`/category/${data.id}`);

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

export const deleteCategory = async (data: IDType) => {
  const res = api.delete(`/category/${data.id}`);

  return res;
};

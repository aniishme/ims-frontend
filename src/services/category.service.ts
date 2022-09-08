import axios from "axios";

export type CategoryData = {
  name: string;
};

type CategoryDataWithId = CategoryData & {
  id: number;
};

export const getCategory = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/`, {
    withCredentials: true,
  });

  return res;
};

export const addCategory = async (data: CategoryData) => {
  const res = axios.post(`${import.meta.env.VITE_BASE_URL}/category/`, data, {
    withCredentials: true,
  });

  return res;
};

export const editCategory = async (data: CategoryDataWithId) => {
  const res = axios.put(
    `${import.meta.env.VITE_BASE_URL}/category/${data.id}`,
    {
      name: data.name,
    },
    {
      withCredentials: true,
    }
  );

  return res;
};

import axios from "axios";

export type CategoryData = {
  name: string;
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

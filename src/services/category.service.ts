import axios from "axios";

export const getCategory = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/`, {
    withCredentials: true,
  });

  return res;
};

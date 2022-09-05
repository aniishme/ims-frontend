import axios from "axios";

type LoginData = {
  username: string;
  password: string;
};

export const loginHandler = async (data: LoginData) => {
  const res = await axios.post("http://localhost:8000/auth/login", data, {
    withCredentials: true,
  });

  return res;
};
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/auth.service";

export const useUsers = () => {
  const users = useQuery(["get-users"], getAllUsers);

  return users;
};

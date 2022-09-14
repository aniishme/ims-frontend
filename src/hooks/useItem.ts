import { useQuery } from "@tanstack/react-query";
import { getItem } from "../services/product.service";

export const useItem = () => {
  const items = useQuery(["get-item"], getItem);

  return items;
};

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { getCategory } from "../services/category.service";

type PropType = {
  children: React.ReactNode;
};
type CategoriesDataType = [
  {
    id: string;
    name: string;
  }
];
export interface CategoryContextType {
  isSuccess: boolean;
  isLoading: boolean;
  data: CategoriesDataType;
}

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }: PropType) => {
  const { data, isLoading, isSuccess } = useQuery(
    ["get-category"],
    getCategory
  );
  const sortedData = data?.data.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <CategoryContext.Provider
      value={{ isSuccess, isLoading, data: sortedData }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

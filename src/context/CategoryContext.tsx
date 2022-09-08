import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { getCategory } from "../services/category.service";

type PropType = {
  children: React.ReactNode;
};

export interface CategoryContextType {
  isSuccess: boolean;
  isLoading: boolean;
  data: [
    {
      id: string;
      name: string;
    }
  ];
}

export const CategoryContext = createContext({});

export const CategoryProvider = ({ children }: PropType) => {
  const { data, isLoading, isSuccess } = useQuery(
    ["get-category"],
    getCategory
  );

  return (
    <CategoryContext.Provider
      value={{ isSuccess, isLoading, data: data?.data }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

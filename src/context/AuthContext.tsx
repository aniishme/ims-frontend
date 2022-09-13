import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { isLoggedIn } from "../services/auth.service";

type PropType = {
  children: React.ReactNode;
};

type User = {
  id: string;
  name: string;
  username: string;
  role: string;
};

export interface AuthContextType {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  user: User;
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropType) => {
  const { data, isLoading, isSuccess, isError } = useQuery(
    ["auth"],
    isLoggedIn
  );

  return (
    <AuthContext.Provider
      value={{ isSuccess, isError, isLoading, user: data?.data }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

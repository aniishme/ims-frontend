import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { isLoggedIn } from "../services/auth.service";

type PropType = {
  children: React.ReactNode;
};

export interface AuthContextType {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  isLoading: boolean;
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropType) => {
  const { data, isLoading } = useQuery(["auth"], isLoggedIn);
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    if (data?.status === 200) {
      setAuth(true);
    }
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

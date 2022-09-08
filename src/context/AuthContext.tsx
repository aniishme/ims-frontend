import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
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
  auth: boolean;
  setAuth: (auth: boolean) => void;
  isLoading: boolean;
  user: User;
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropType) => {
  const { data, isLoading, isSuccess } = useQuery(["auth"], isLoggedIn);
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setAuth(true);
    }
  }, [isSuccess]);
  
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLoading, user: data?.data }}
    >
      {children}
    </AuthContext.Provider>
  );
};

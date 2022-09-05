import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";

import { loginHandler } from "../services/auth.service";
import { Navigate } from "react-router-dom";
import { AxiosError } from "axios";

function Login() {
  const cookie = new Cookies();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isAuth, setIsAuth] = useState(false);

  const { mutateAsync: login, isLoading } = useMutation(loginHandler);
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => cookie.set("auth", true, { path: "/" }),
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        }
      },
    });
  };

  if (cookie.get("auth")) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="login">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={(e) => handleOnchange(e)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={(e) => handleOnchange(e)}
        />
        <br />
        <input
          type="button"
          value={isLoading ? "Logging In" : "Login"}
          disabled={isLoading}
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
}

export default Login;

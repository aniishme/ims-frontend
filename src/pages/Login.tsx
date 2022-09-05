import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { loginHandler } from "../services/auth.service";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const { mutate: login, isLoading } = useMutation(loginHandler);
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    login(formData);
  };

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

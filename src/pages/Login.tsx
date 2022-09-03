import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleOnchange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
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
      </form>
    </div>
  );
}

export default Login;

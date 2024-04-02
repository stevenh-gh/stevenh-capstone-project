import Header from "../components/Header";
import { Typography } from "@mui/material";
import { login } from "../api";
import { useState } from "react";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e, loginData) {
    e.preventDefault();
    const token = await login(loginData);
    window.localStorage.setItem("token", token.token);
    setToken(window.localStorage.getItem("token"));
    e.target.reset();
  }

  return (
    <>
      <Header txt={"Login"} />
      <Typography variant='body1'>
        <form onSubmit={e => submit(e, { username, password })}>
          <label htmlFor="username">Username</label>
          <input onChange={e => setUsername(e.target.value)} type="text" id="username" />
          <label htmlFor="password">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" id="password" />
          <button type="submit">Log in</button>
        </form>
      </Typography>
    </>
  );
}

export default Login;

import { SnackbarProvider, enqueueSnackbar } from "notistack";

import Header from "../components/Header";
import { Typography } from "@mui/material";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e, loginData) {
    e.preventDefault();
    try {
      const token = await login(loginData);
      window.localStorage.setItem("token", token.token);
      setToken(window.localStorage.getItem("token"));
      e.target.reset();
      enqueueSnackbar('Successfully logged in! Redirecting...')
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (err) {
      enqueueSnackbar(err)
    }
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
        <SnackbarProvider />
      </Typography>
    </>
  );
}

export default Login;

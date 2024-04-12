import { SnackbarProvider, enqueueSnackbar } from "notistack";

import Header from "../components/Header";
import { Typography } from "@mui/material";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function submit(e, signupData) {
    e.preventDefault();
    try {
      await signup(signupData);
      e.target.reset();
      enqueueSnackbar('Successfully signed up. Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    } catch (err) {
      enqueueSnackbar(err)
    }
  }

  return (
    <>
      <Header txt={"Sign up"} />
      <Typography variant='body1'>
        <form onSubmit={e => submit(e, { username, password })}>
          <label htmlFor="username">Username</label>
          <input onChange={e => setUsername(e.target.value)} type="text" id="username" />
          <label htmlFor="password">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" id="password" />
          <button type="submit">Sign up</button>
        </form>
        <SnackbarProvider />
      </Typography>
    </>
  );
}

export default Signup;

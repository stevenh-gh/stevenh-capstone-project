import Header from "../components/Header";
import { Typography } from "@mui/material";
import { signup } from "../api";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e, signupData) {
    e.preventDefault();
    // should return a token
    const id = await signup(signupData);
    // log for now
    console.log(id);
    e.target.reset();
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

      </Typography>
    </>
  );
}

export default Signup;

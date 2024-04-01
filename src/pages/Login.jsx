import { useState } from "react";
import { login } from "../api";
import Header from "../components/Header";

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
      <form onSubmit={e => submit(e, { username, password })}>
        <label htmlFor="username">Username</label>
        <input onChange={e => setUsername(e.target.value)} type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input onChange={e => setPassword(e.target.value)} type="password" id="password" />
        <button type="submit">Log in</button>
      </form>
    </>
  );
}

export default Login;

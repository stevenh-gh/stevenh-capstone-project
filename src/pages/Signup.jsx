import { useState } from "react";
import { signup } from "../api";
import Header from "../components/Header";

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
      <form onSubmit={e => submit(e, { username, password })}>
        <label htmlFor="username">Username</label>
        <input onChange={e => setUsername(e.target.value)} type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input onChange={e => setPassword(e.target.value)} type="password" id="password" />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default Signup;

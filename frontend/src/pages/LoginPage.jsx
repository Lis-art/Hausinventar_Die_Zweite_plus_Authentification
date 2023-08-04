import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav/nav";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios.post("/api/user/login", {
        name,
        email,
        password,
      });
      const { data } = response;
      nav("/ProfilePage");
      console.log("successful", data);
    } catch (e) {
      console.log(e, "Login failed, please try again later");
    }
  };

  return (
    <>
      <header>
        <div>
          <Nav />
        </div>
      </header>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;

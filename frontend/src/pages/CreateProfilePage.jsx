import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav/nav";

const CreateProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/signup", {
        name,
        email,
        password,
      });
      const { data } = response;
      nav("/LoginPage");
      console.log("User successfully created", data);
    } catch (error) {
      console.log(error, "Registration failed");
    }
  };

  return (
    <div>
      <header>
        <div>
          <Nav />
        </div>
        <h1>Create a New Account</h1>
      </header>
      <h3>Please enter your data</h3>
      <form onSubmit={signUp}>
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateProfilePage;

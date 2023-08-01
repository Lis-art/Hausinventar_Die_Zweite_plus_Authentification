import Nav from "../components/nav/nav.jsx";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateProfilPage = () => {
  const [refresh, setRefresh] = useState(true);
  const nav = useNavigate();

  const createUser = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await axios.post("/api/user/signup", formData);
      setRefresh((prev) => !prev);
      e.target.reset();
      nav("/LoginPage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <h2>Create Profile</h2>

        <form onSubmit={createUser}>
          <input type="text" placeholder="Name" name="name" />
          <input type="text" placeholder="Email" name="email" />
          <input type="file" name="image" id="file" className="inputfile" />
          <label htmlFor="file">Upload Image</label>
          <input type="text" placeholder="Description" name="description" />
          <input
            type="text"
            placeholder="password"
            name="password"
            id="password"
          />
          <button className="PublishBtn">Create Accout</button>
        </form>
      </main>
    </>
  );
};

export default CreateProfilPage;

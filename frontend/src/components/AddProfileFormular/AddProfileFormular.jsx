import "./AddFormular.css";
import axios from "axios";
import { useState } from "react";

const addUserProfile = ({ setRefresh }) => {
  const [addUser, setAddUser] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    /*         formData.set("category", category) */
    console.log(formData);

    const response = await axios.post("/api/user", formData);
    setRefresh((prev) => !prev);
    console.log(response);

    e.target.reset();
  };

  return (
    <div>
      <button onClick={() => setAddUser((prev) => !prev)}>
        Create Profile
      </button>

      <form
        onSubmit={createUser}
        style={addUser ? { display: "block" } : { display: "none" }}
      >
        <div>
          <input type="text" name="name" id="name" />
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input type="text" name="email" id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input type="text" name="description" id="description" />
          <label htmlFor="description">Über mich</label>
        </div>
        <div>
          <input type="file" name="image" id="image" />
          <label htmlFor="image">Image</label>
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default addUserProfile;

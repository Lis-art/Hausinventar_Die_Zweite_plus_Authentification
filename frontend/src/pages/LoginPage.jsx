import { NavLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div>
        <h2>Login</h2>
        <input type="text" name="name" placeholder="Username" />
        <input type="text" name="email" placeholder="Email" />

        <button>
          <NavLink className="linkNav" to="/ProfilePage">
            LOGIN
          </NavLink>
        </button>

        <button>
          <NavLink className="linkNav" to="/CreateProfilePage">
            CREATE PROFILE
          </NavLink>
        </button>
      </div>
    </>
  );
};

export default LoginPage;

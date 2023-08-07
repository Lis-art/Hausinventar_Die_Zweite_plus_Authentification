import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useContext } from "react";
import { UserContext } from "../../user/UserContext";

const Nav = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <>
      <div className="navLinksDiv">
        <NavLink className="linkNav" to="/">
          HOME
        </NavLink>
        <NavLink className="linkNav" to="/CategoryPage/big">
          BIG STUFF
        </NavLink>
        <NavLink className="linkNav" to="/CategoryPage/medium">
          NOT SO BIG STUFF
        </NavLink>
        <NavLink className="linkNav" to="/CategoryPage/small">
          SMALL
        </NavLink>

        {!isLoggedIn && (
          <>
            <NavLink className="linkNav" to="/CreateProfile">
              Sign Up
            </NavLink>
            <NavLink className="linkNav" to="/LoginPage">
              LOGIN
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <>
            <NavLink className="linkNav" to="/ProfilePage">
              PROFILEPAGE
            </NavLink>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}

        {/* <NavLink className="linkNav" to="/ProfilePage">PROFILEPAGE</NavLink>
        <NavLink className="linkNav" to="/LoginPage">LOGIN</NavLink>
        <NavLink className="linkNav" to="/CreateProfile">Sign Up</NavLink> */}
      </div>
    </>
  );
};

export default Nav;

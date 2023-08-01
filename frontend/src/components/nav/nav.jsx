import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
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
        <NavLink className="linkNav" to="/ProfilePage">
          PROFILEPAGE
        </NavLink>
        <NavLink className="linkNav" to="/LoginPage">
          LOGIN
        </NavLink>
        <NavLink className="linkNav" to="/CreateProfile">
          CREATE PROFILE
        </NavLink>
      </div>
    </>
  );
};

export default Nav;

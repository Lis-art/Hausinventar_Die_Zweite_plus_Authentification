import { NavLink } from "react-router-dom";
import Nav from "../components/nav/nav";
import bigStuff from "../assets/images/big.jpeg";
import mediumStuff from "../assets/images/medium2.jpeg";
import smallStuff from "../assets/images/small_stuff.jpeg";
import HomeCategories from "../components/bing/HomeCategories.jsx";
import "./HomePage.css";

const Homepage = () => {
  return (
    <>
      <header>
        <Nav />
        <div>
          <h1>My Furniture</h1>
        </div>
      </header>

      <main className="categoryLinksContainer">
        <div>
          <NavLink to="/categoryPage/big">
            <HomeCategories name="big" imgPath={bigStuff} />
          </NavLink>
        </div>
        <div>
          <NavLink to="/categoryPage/medium">
            <HomeCategories name="medium" imgPath={mediumStuff} />
          </NavLink>
        </div>
        <div>
          <NavLink to="/categoryPage/small">
            <HomeCategories name="small" imgPath={smallStuff} />
          </NavLink>
        </div>
      </main>
    </>
  );
};

export default Homepage;

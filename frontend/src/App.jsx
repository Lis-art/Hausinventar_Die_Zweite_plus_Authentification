import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import CreateProfilePage from "./pages/CreateProfilePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/detailPage/:id" element={<DetailPage />}></Route>
          <Route
            path="/categoryPage/:category"
            element={<CategoryPage />}
          ></Route>
          <Route path="/createProfile" element={<CreateProfilePage />}></Route>
          <Route path="/loginPage" element={<LoginPage />}></Route>
          <Route path="/profilePage" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

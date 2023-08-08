import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import CreateProfilePage from "./pages/CreateProfilePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useContext } from "react";
import { UserContext } from "./user/UserContext";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/detailPage/:id" element={<DetailPage />}></Route>
        <Route
          path="/categoryPage/:category"
          element={<CategoryPage />}
        ></Route>
        <Route path="/createProfile" element={<CreateProfilePage />}></Route>
        <Route path="/loginPage" element={<LoginPage />}></Route>
        <Route path="/profilePage/:id" element={<ProfilePage />}></Route>
        <Route path="/passwordReset" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;

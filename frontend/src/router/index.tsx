import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppWrapper from "../components/AppWrapper/AppWrapper";
import HomePage from "../pages/HomePage/HomePage";
import Profil from "../pages/Profil/Profil";
import Settings from "../pages/Settings/Settings";
import Community from "../pages/Community/Community";
import Error404 from "../pages/Error404/Error404";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default AppRouter;

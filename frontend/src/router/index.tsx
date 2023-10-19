import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppWrapper from "../components/AppWrapper/AppWrapper";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profil from "../pages/Profil/Profil";
import Settings from "../pages/Settings/Settings";
import Community from "../pages/Community/Community";
import Error404 from "../pages/Error404/Error404";

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Encapsule l'ensemble de l'UI dans AppWrapper */}
      <AppWrapper>
        <Routes>
          {/* Définition des routes*/}
          <Route path="/" element={<Dashboard />} />
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

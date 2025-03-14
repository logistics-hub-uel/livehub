import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UserLoginPage from "./components/pages/user/UserLoginPage";
import AdminLoginPage from "./components/pages/admin/AdminLoginPage";
import UserRegisterPage from "./components/pages/user/UserRegisterPage";
import AppLayout from "./components/layouts/AppLayout";
import UserDemand from "./components/pages/user/UserDemand";
import LandingPage from "./components/pages/LandingPage";
import CareersPage from "./components/pages/CareersPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import DemandList from "./components/pages/user/DemandList";
import theme from "./theme";

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/auth" element={<DefaultLayout />}>
            <Route path="login" element={<UserLoginPage />} />
            <Route path="register" element={<UserRegisterPage />} />
          </Route>

          <Route path="/admin" element={<DefaultLayout />}>
            <Route path="login" element={<AdminLoginPage />} />
          </Route>

          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<LandingPage />} />
          </Route>

          <Route path="/dashboard" element={<AppLayout />}>
            <Route path="demand" element={<UserDemand />} />
            <Route path="demandlist" element={<DemandList />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;

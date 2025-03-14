import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserService from "./components/pages/user/UserService";
import { MantineProvider } from "@mantine/core";
import DemandApplication from "./components/pages/user/DemandApplication";
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
import ServiceRental from "./components/pages/user/ServiceRental";
import { Notifications } from "@mantine/notifications";
import AdminManageService from "./components/pages/admin/AdminManageService";
import AdminManageDemand from "./components/pages/admin/AdminManageDemand";

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
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
            <Route path="service" element={<UserService />} />
            <Route path="demand" element={<UserDemand />} />
            <Route path="demandlist" element={<DemandList />} />
            {/* Rentals */}
            <Route path="rentals" element={<ServiceRental />} />
            <Route
              path="applications"
              element={
                <>
                  <DemandApplication />
                </>
              }
            />
            <Route
              path="manage-services"
              element={
                <>
                  <AdminManageService />
                </>
              }
            />
            <Route
              path="manage-demands"
              element={
                <>
                  <AdminManageDemand />
                </>
              }
            />
            <Route
              path="setting"
              element={
                <>
                  <h1>Setting</h1>
                </>
              }
            />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;

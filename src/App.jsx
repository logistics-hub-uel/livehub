import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/ui/header";
import DefaultLayout from "./components/layouts/DefaultLayout";
import LoginPage from "./components/pages/user/UserLoginPage";
import UserLoginPage from "./components/pages/user/UserLoginPage";
import AdminLoginPage from "./components/pages/admin/AdminLoginPage";
import UserRegisterPage from "./components/pages/user/UserRegisterPage";
import AppLayout from "./components/layouts/AppLayout";
import UserDemand from "./components/pages/user/UserDemand";

const App = () => {
  return (
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
          <Route path="*" element={<h1>LANDING PAGE</h1>} />
        </Route>

        <Route path="/dashboard" element={<AppLayout />}>
          <Route path="demand" element={<UserDemand />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

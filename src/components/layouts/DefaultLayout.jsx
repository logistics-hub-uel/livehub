import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../ui/Header";
import Footer from "../ui/Footer";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;

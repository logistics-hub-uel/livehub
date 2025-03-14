import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../ui/header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div>FOOTER</div>
    </>
  );
};

export default DefaultLayout;

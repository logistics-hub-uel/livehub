import React from "react";
import { Header } from "../ui/header";
import Sidebar from "../ui/Sidebar";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>

        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    </>
  );
};

export default AppLayout;

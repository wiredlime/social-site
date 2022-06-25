import React from "react";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;

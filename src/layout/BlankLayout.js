import React from "react";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Logo from "../components/form/Logo.js";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Logo sx={{ width: 90, height: 90, mb: 2 }} />

      <Outlet />
    </Stack>
  );
}

export default BlankLayout;

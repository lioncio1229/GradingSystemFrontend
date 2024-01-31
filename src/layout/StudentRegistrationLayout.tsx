import { Box, Stack, Typography, AppBar } from "@mui/material";
import Logo from "assets/logo.png";
import { Outlet } from "react-router-dom";

export default function StudentRegistrationLayout() {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={2}>
        <Stack
          sx={{
            alignItems: "center",
            p: 3,
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="h1" fontSize={50} color="primary">
              PHILTECH
            </Typography>
          </Stack>
          <Typography sx={{ color: "primary.main" }} fontSize={30}>
            New Student Registration SY 2023
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "primary.dark" }}>
            HI! Please fill out all required informations below. Then click
            Submit.
          </Typography>
        </Stack>
      </AppBar>
      <Outlet />
    </>
  );
}

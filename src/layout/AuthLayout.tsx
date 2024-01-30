import { Box, Stack, Typography } from "@mui/material"
import Logo from "assets/logo.png";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <>
            <Stack sx={{
                bgcolor: "secondary.main",
                alignItems: "center",
                p: 2
            }}>
                <Stack flexDirection="row" alignItems="center">
                    <Box component="img" src={Logo} sx={{width: 100, height: "auto"}} />
                    <Typography variant="h1" fontSize={42} color="primary">PHILTECH</Typography>
                </Stack>
                <Typography sx={{color: "primary.dark"}}>Balibago Commercial Complex, GS-B, Brgy Balibago, Sta Rosa, Laguna</Typography>
            </Stack>
            <Outlet />
        </>
    )
}
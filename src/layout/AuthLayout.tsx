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
            }} gap={1}>
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Box component="img" src={Logo} sx={{width: 120, height: "auto"}} />
                    <Typography variant="h1" fontSize={42} color="primary">PHILTECH</Typography>
                </Stack>
                <Typography sx={{color: "primary.dark"}}>Balibago Commercial Complex, GS-B, Brgy Balibago, Sta Rosa, Laguna</Typography>
            </Stack>
            <Outlet />
        </>
    )
}
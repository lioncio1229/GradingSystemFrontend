import MissionVissionLogo from "assets/mission_vission.jpg"
import { Box, Typography } from "@mui/material";

export default function MissionVission(){
    return (
        <Box component="img" src={MissionVissionLogo} sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            pb: 5
        }} />
    )
}
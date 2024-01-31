import { useState } from "react"
import { Box, AppBar, Toolbar, Button } from "@mui/material"

const menus : string[] = [
    "Report Card (Online)",
    "Subjects(s) Enrolled/Assessed",
]

export default function StudentPortal(){
    const [selectedMenu, setSelectedMenu] = useState<string>("Report Card (Online)");

    return (
        <Box>
            <AppBar position="static" color="transparent" sx={{p: "4px"}}>
                <Toolbar sx={{justifyContent: "flex-end", border: "1px solid", borderColor: "primary.main"}} variant="dense">
                    {
                        menus.map(menu => (
                            <Button variant={selectedMenu === menu ? "contained" : "text"} sx={{ml: 1}} onClick={() => setSelectedMenu(menu)}>{menu}</Button>
                            ))
                    }
                    <Button sx={{ml: 1}}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
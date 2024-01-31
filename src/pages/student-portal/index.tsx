import { useState } from "react";
import { Box, AppBar, Toolbar, Button, Container } from "@mui/material";
import ReportCard from "./RepordCard";
import SubjectsEnrolled from "./SubjectsEnrolled";

interface Menu {
  label: string;
  component: JSX.Element;
}

const menus: Menu[] = [
  {
    label: "Report Card (Online)",
    component: <ReportCard />,
  },
  {
    label: "Subjects(s) Enrolled/Assessed",
    component: <SubjectsEnrolled />,
  },
];

export default function StudentPortal() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>();

  const handleMenuChange = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar
          sx={{
            justifyContent: "flex-end",
          }}
          variant="dense"
        >
          {menus.map((menu) => (
            <Button
              variant={
                selectedMenu?.label === menu.label ? "contained" : "text"
              }
              sx={{ ml: 1 }}
              onClick={() => handleMenuChange(menu)}
            >
              {menu.label}
            </Button>
          ))}
          <Button sx={{ ml: 1 }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        {selectedMenu && selectedMenu.component}
      </Container>
    </Box>
  );
}

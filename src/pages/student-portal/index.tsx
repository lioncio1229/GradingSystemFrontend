import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import ReportCard from "./RepordCard";
import SubjectsEnrolled from "./SubjectsEnrolled";
import StudentLectures from "./StudentLectures";
import Account from "./Account";
import MissionVission from "./MissionVission";
import { Home } from "@mui/icons-material";

interface Menu {
  label: string;
  component: JSX.Element;
}

const menus: Menu[] = [
  {
    label: "Report Card",
    component: <ReportCard />,
  },
  {
    label: "Lectures",
    component: <StudentLectures />,
  },
  {
    label: "Subjects",
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
            justifyContent: selectedMenu ? "space-between" : "flex-end",
          }}
        >
          {
            selectedMenu &&
            <IconButton onClick={() => setSelectedMenu(undefined)}>
              <Home fontSize="large" />
            </IconButton>
          }
          <Stack flexDirection="row">
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
            <Box ml={2}>
              <Account />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ p: 3 }}>
        {selectedMenu ? selectedMenu.component : <MissionVission />}
      </Container>
    </Box>
  );
}

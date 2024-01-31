import { useState } from "react";
import { Box, AppBar, Toolbar, Button, Container } from "@mui/material";
import ReportCard from "./RepordCard";
import SubjectsEnrolled from "./SubjectsEnrolled";
import StudentLectures from "./StudentLectures";
import Account from "./Account";

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
    component: <StudentLectures />
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
            justifyContent: "flex-end",
          }}
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
          <Box ml={2}>
            <Account />
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{p: 3}}>
        {selectedMenu && selectedMenu.component}
      </Container>
    </Box>
  );
}

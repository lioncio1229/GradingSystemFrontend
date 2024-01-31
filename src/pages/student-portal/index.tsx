import { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import useUserInfo from "hooks/useUserInfo";
import { useGetStudentQuery } from "services/studentServices";
import { setStudent } from "./slice";
import { Student } from "services/types";

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
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState<Menu>();

  const { id } = useUserInfo();
  const { data: student } = useGetStudentQuery({
    studentId: id === "" ? "0" : id,
  });

  const handleMenuChange = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    if (!student) return;

    const _student = student as Student;
    dispatch(setStudent(_student));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

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

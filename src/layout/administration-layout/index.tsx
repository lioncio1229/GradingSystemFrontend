import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MenuBook,
  People,
  SupervisorAccount,
  Subject,
  Groups,
  Grade,
  LocalLibrary,
  School,
} from "@mui/icons-material";
import Logo from "assets/logo.png";
import { useLocation } from "react-router-dom";
import Account from "./Account";
import useUserInfo from "hooks/useUserInfo";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type ListItem = {
  icon: JSX.Element | null;
  label: string;
  path: string;
  roles: string[];
};

const mainList: ListItem[] = [
  {
    icon: <Subject />,
    label: "Subjects",
    path: "/portal/admin",
    roles: ["admin"],
  },
  {
    icon: <School />,
    label: "Students",
    path: "/portal/admin/students",
    roles: ["admin"],
  },
  {
    icon: <SupervisorAccount />,
    label: "Teachers",
    path: "/portal/admin/teachers",
    roles: ["admin"],
  },
  {
    icon: <MenuBook />,
    label: "Lectures",
    path: "/portal/admin/lectures",
    roles: ["admin"],
  },
  {
    icon: <Groups />,
    label: "Manage Users",
    path: "/portal/admin/users",
    roles: ["admin"],
  },
];

const otherList: ListItem[] = [
  {
    icon: <Grade />,
    label: "Student Grades",
    path: "/portal/faculty",
    roles: ["faculty"],
  },
  {
    icon: <LocalLibrary />,
    label: "My Lectures",
    path: "/portal/faculty/lectures",
    roles: ["faculty"],
  },
  {
    icon: <Subject />,
    label: "My Subjects",
    path: "/portal/faculty/subjects",
    roles: ["faculty"],
  },
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function AdministrationLayout() {
  const navigate = useNavigate();
  const { roles } = useUserInfo();

  const [roleTitle, setRoleTitle] = useState<string>("Administrator");
  const [mainListFiltered, setMainListFiltered] = useState<ListItem[]>([]);
  const [otherListFiltered, setOtherListFiltered] = useState<ListItem[]>([]);

  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ListItem>({
    label: "",
    icon: null,
    path: "",
    roles: [],
  });
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();

  const handleItemClick = (item: ListItem) => {
    navigate(item.path);
  };

  useEffect(() => {
    if (roles.length === 0) return;

    setRoleTitle(roles.join(" and "));

    const _mainList = mainList.filter((item) =>
      item.roles
        .map((role) => roles.includes(role))
        .some((roleIsIncluded) => roleIsIncluded === true)
    );

    setMainListFiltered(_mainList);

    const _otherList = otherList.filter((item) =>
      item.roles
        .map((role) => roles.includes(role))
        .some((roleIsIncluded) => roleIsIncluded === true)
    );

    setOtherListFiltered(_otherList);

    const item: ListItem | undefined = [..._mainList, ..._otherList].find(
      (list) => list.path === location.pathname
    );

    if (item !== undefined) setSelectedItem(item);
    else {
      if (roles.includes("admin")) {
        navigate("/portal/admin");
      } else if (roles.includes("faculty")) {
        navigate("/portal/faculty");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, roles]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {selectedItem.label}
          </Typography>
          <Account />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: [1],
            py: [1],
            position: "relative",
          }}
        >
          <Stack alignItems="center">
            <Typography
              variant="caption"
              color="primary"
              textTransform="capitalize"
            >
              {roleTitle}
            </Typography>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Box
                component="img"
                src={Logo}
                sx={{ width: 40, height: "auto" }}
              />
              <Typography fontSize={24} color="primary" fontWeight="600">
                PHILTECH
              </Typography>
            </Stack>
          </Stack>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "absolute",
              right: 0,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListFiltered.map((item) => (
            <ListItemButton
              onClick={() => handleItemClick(item)}
              selected={item.path === selectedItem.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          {mainListFiltered.length > 0 && <Divider sx={{ my: 1 }} />}
          {otherListFiltered.map((item) => (
            <ListItemButton
              onClick={() => handleItemClick(item)}
              selected={item.path === selectedItem.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

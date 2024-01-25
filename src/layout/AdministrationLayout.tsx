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
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate, Outlet } from "react-router-dom";
import { Stack, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MenuBook, People, SupervisorAccount, Subject, Groups } from "@mui/icons-material";
import Logo from "assets/logo.png";
import { useLocation } from "react-router-dom";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type ListItem = {
  icon: JSX.Element | null,
  label: string,
  path: string,
}

const mainList : ListItem[] = [
  {
    icon: <Subject />,
    label: "Subjects",
    path: "/admin/portal",
  },
  {
    icon: <People />,
    label: "Students",
    path: "/admin/portal/students"
  },
  {
    icon: <SupervisorAccount />,
    label: "Teachers",
    path: "/teachers",
  },
  {
    icon: <MenuBook/>,
    label: "Lectures",
    path: "/lectures",
  },
];

const otherList = [
  {
    icon: <Groups />,
    label: "Manage Users",
    path: "/users"
  }
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
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ListItem>({
    label: "",
    icon: null,
    path: "",
  });
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();

  const handleItemClick = (item: ListItem) => {
    navigate(item.path);
  }

  useEffect(() => {
    const item : ListItem | undefined = mainList.find(list => list.path === location.pathname);

    if(item !== undefined)
      setSelectedItem(item);

  }, [location.pathname]);

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
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
            <Typography variant="caption" color="primary">Administrator</Typography>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Box component="img" src={Logo} sx={{width: 40, height: "auto"}} />
              <Typography fontSize={24} color="primary" fontWeight="600">PHILTECH</Typography>
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
          {
            mainList.map(item => (
              <ListItemButton onClick={() => handleItemClick(item)} selected={item.path === selectedItem.path}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))
          }
          <Divider sx={{ my: 1 }} />
          {
            otherList.map(item => (
              <ListItemButton onClick={() => handleItemClick(item)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))
          }
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

import { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Toolbar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Person, Logout } from "@mui/icons-material";
import useUserInfo from "hooks/useUserInfo";
import { useLogoutStudentMutation } from "services/studentAuthServices";

interface Setting {
  key: string,
  label: string | JSX.Element;
  icon: JSX.Element;
}

const settings: Setting[] = [
  {
    key: "logout",
    label: <Typography color="error">Logout</Typography>,
    icon: <Logout color="error" />,
  },
];

export default function Account() {
  const { firstName, lastName } = useUserInfo();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [logout] = useLogoutStudentMutation();

  const fullName = `${firstName} ${lastName}`;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: Setting) => {
    setAnchorElUser(null);

    switch (setting.key) {
      case "logout": {
        logout(null)
          .unwrap()
          .then((rep) => {
            localStorage.clear();
            window.location.href = "/";
          });
      }
    }
  };

  return (
    <Box>
      <Tooltip title="See profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{bgcolor: "secondary.light", color: "primary.main"}}>{fullName.length > 0 ? fullName[0] : ""}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Toolbar sx={{ minWidth: 300 }}>
          <Person fontSize="large" color="primary" />
          <Typography>{fullName}</Typography>
        </Toolbar>
        <Divider />
        {settings.map((setting) => (
          <MenuItem
            key={setting.key}
            onClick={() => handleCloseUserMenu(setting)}
          >
            <ListItemIcon sx={{ pl: 2 }}>{setting.icon}</ListItemIcon>
            <ListItemText sx={{ pl: 2 }}>{setting.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

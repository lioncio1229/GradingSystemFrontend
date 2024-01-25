import React, { useState, useMemo, ChangeEvent } from "react";
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import { LockOutlined, ArrowBack } from "@mui/icons-material";
import { useLoginMutation } from "services/adminAuthServices";
import { LoginModel } from "services/types";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export default function AdminSignin() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [isButtonLoading, setButtonLoading] = useState(false);

  const [errorState, setErrorState] = useState({
    usernameHasError: true,
    passwordHasError: true,
  });

  const isEnabled = useMemo(
    () => Object.values(errorState).every((item) => !item),
    [errorState]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);

    const model: LoginModel = {
      username: data.get("email") ?? "",
      password: data.get("password") ?? "",
    };

    console.log(model);
    setButtonLoading(true);
    login(model)
      .unwrap()
      .then((resp) => {
        localStorage.setItem("token", resp.token);
        setButtonLoading(false);
        //   navigate("/main");
      })
      .catch((err) => {
        setButtonLoading(false);
      });
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const email = value.trim();
    let hasError = false;

    if (email.trim() === "") {
      hasError = true;
    }

    setErrorState({ ...errorState, usernameHasError: hasError });
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: password } = e.target;
    let hasError = false;

    if (password === "") {
      hasError = true;
    }

    setErrorState({ ...errorState, passwordHasError: hasError });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            left: 0,
            top: 30,
          }}
        >
          <ArrowBack />
        </IconButton>

        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handlePasswordInputChange}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isEnabled}
            loading={isButtonLoading}
            size="large"
          >
            Login
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/admin/signup" variant="body2">
                Don&apos;t have an account? Signup
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

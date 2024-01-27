import { useEffect, useState, useMemo } from "react";
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { LockOutlined, ArrowBack } from "@mui/icons-material";

import { useRegisterMutation } from "services/adminAuthServices";
import { RegisterModel } from "services/types";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export default function AdminSignup() {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [isButtonLoading, setButtonLoading] = useState(false);

  const [error, setError] = useState({
    userNameError: "",
    emailError: "",
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [errorState, setErrorState] = useState({
    userNameHasError: true,
    emailHasError: true,
    firstNameHasError: true,
    lastNameHasError: true,
    passwordHasError: true,
    confirmPasswordHasError: true,
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEnabled = useMemo(
    () => Object.values(errorState).every((item) => !item),
    [errorState]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget as HTMLFormElement);

    const email = data.get("email")?.toString().trim() ?? "";
    const username = data.get("username")?.toString().trim() ?? "";
    const firstName = data.get("firstname")?.toString().trim() ?? "";
    const lastName = data.get("lastname")?.toString().trim() ?? "";
    const password = data.get("password");

    const model: RegisterModel = {
      email,
      username,
      firstName,
      lastName,
      password,
    };

    setButtonLoading(true);
    register(model)
      .unwrap()
      .then((resp) => {
        localStorage.setItem("token", resp.token);
        setButtonLoading(false);
        navigate("/portal");
        console.log("resp -> ", resp);
      })
      .catch((err) => {
        setButtonLoading(false);
      });
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const email = value.trim();
    let errorValue = "";
    let hasError = false;

    if (email.trim() === "") {
      errorValue = "Please add email";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorValue = "Invalid email";
      hasError = true;
    }

    setError({ ...error, emailError: errorValue });
    setErrorState({ ...errorState, emailHasError: hasError });
  };

  const handleUsernameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const username = value.trim();
    let errorValue = "";
    let hasError = false;

    if (username === "") {
      errorValue = "Please add username";
      hasError = true;
    } else if (!/^(?!.*\.\.)(?!.*\.$)[^\W_]{3,16}$/.test(username)) {
      errorValue = "Invalid username";
      hasError = true;
    }

    setError({ ...error, userNameError: errorValue });
    setErrorState({ ...errorState, userNameHasError: hasError });
  };

  const handleFirstNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const firstName = value.trim();
    let errorValue = "";
    let hasError = false;

    if (firstName === "") {
      errorValue = "Please add your first name";
      hasError = true;
    }

    setError({ ...error, firstNameError: errorValue });
    setErrorState({ ...errorState, firstNameHasError: hasError });
  };

  const handleLastNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const lastName = value.trim();
    let errorValue = "";
    let hasError = false;

    if (lastName === "") {
      errorValue = "Please add your last name";
      hasError = true;
    }

    setError({ ...error, lastNameError: errorValue });
    setErrorState({ ...errorState, lastNameHasError: hasError });
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: password } = e.target;

    let errorValue = "";
    let hasError = false;

    if (password.length < 6) {
      errorValue = "Password characters minimum of 6";
      hasError = true;
    }

    setError((error) => ({ ...error, passwordError: errorValue }));
    setErrorState({ ...errorState, passwordHasError: hasError });
    setPassword(password);
  };

  const handleConfirmPasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: confirmPassword } = e.target;

    let errorValue = "";
    let hasError = false;

    if (confirmPassword !== password) {
      errorValue = "Password not matched";
      hasError = true;
    }

    setError((error) => ({ ...error, confirmPasswordError: errorValue }));
    setErrorState({ ...errorState, confirmPasswordHasError: hasError });
    setConfirmPassword(confirmPassword);
  };

  useEffect(() => {
    let errorValue = "";
    let hasError = false;

    if (confirmPassword.length > 0 && password !== confirmPassword) {
      errorValue = "Password not matched";
    }
    if (password !== confirmPassword) {
      hasError = true;
    }

    setError((error) => ({ ...error, confirmPasswordError: errorValue }));
    setErrorState({ ...errorState, confirmPasswordHasError: hasError });
  }, [password]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
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

        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
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
                error={error.emailError.length > 0}
                helperText={error.emailError}
                onChange={handleEmailInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                error={error.userNameError.length > 0}
                helperText={error.userNameError}
                onChange={handleUsernameInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="first-name"
                name="firstname"
                required
                fullWidth
                id="firstName"
                label="First Name"
                error={error.firstNameError.length > 0}
                helperText={error.firstNameError}
                onChange={handleFirstNameInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="last-name"
                name="lastname"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                error={error.lastNameError.length > 0}
                helperText={error.lastNameError}
                onChange={handleLastNameInputChange}
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
                error={error.passwordError.length > 0}
                helperText={error.passwordError}
                onChange={handlePasswordInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                error={error.confirmPasswordError.length > 0}
                helperText={error.confirmPasswordError}
                onChange={handleConfirmPasswordInputChange}
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
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/admin/signin" variant="body2">
                Already have an account? Sigin in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

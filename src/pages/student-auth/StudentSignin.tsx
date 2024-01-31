import React, { useState, useMemo, ChangeEvent } from "react";
import {
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  IconButton,
  Container,
  Toolbar,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLoginStudentMutation } from "services/studentAuthServices";
import { StudentLoginModel } from "services/types";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { orange } from "@mui/material/colors";

export default function StudentSignin() {
  const [login] = useLoginStudentMutation();
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

    const model: StudentLoginModel = {
      lrn: data.get("lrn")?.toString() ?? "",
      fullName: data.get("fullname")?.toString() ?? "",
    };

    setButtonLoading(true);
    login(model)
      .unwrap()
      .then((resp) => {
        localStorage.setItem("token", resp.token);
        setButtonLoading(false);
        navigate("/student-portal");
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
      <Toolbar disableGutters>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBack />
        </IconButton>
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          position: "relative",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="lrn"
                label="LRN"
                name="lrn"
                autoComplete="lrn"
                onChange={handleEmailInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="fullname"
                label="Full Name"
                id="fullname"
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
            Submit
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
                <Typography variant="subtitle2" color="primary" component="span">If new student, please click</Typography>
              <Link href="/student/signup" variant="body2" sx={{pl: 1}} color={orange[800]}>
                 here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const navigate = useNavigate();

  return (
    <Stack direction="row" justifyContent="center" spacing={1} mt={10}>
      <Button
        variant="contained"
        size="large"
        sx={{
          minWidth: 400,
          fontSize: 24,
        }}
        onClick={() => navigate("/admin/signin")}
      >
        Teacher / Admin
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{
          minWidth: 400,
          fontSize: 24
        }}
      >
        Student
      </Button>
    </Stack>
  );
}

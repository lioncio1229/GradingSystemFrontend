import useUserInfo from "hooks/useUserInfo";
import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { lightGreen, blue } from "@mui/material/colors";

export default function Welcome() {
  const { firstName, lastName } = useUserInfo();

  return (
    <Box mt={2}>
      <Container maxWidth="sm">
        <Stack spacing={2} alignItems="center">
          <Typography variant="h2" color={lightGreen[500]}>
            Successful!
          </Typography>
          <Button variant="outlined" size="large">
            <Typography fontWeight="600" color={blue[800]}>
              {"Proceed >>"}
            </Typography>
          </Button>
          <Typography
            color="primary"
            fontSize={20}
            textTransform="uppercase"
            textAlign="center"
            fontWeight="600"
          >
            WELCOME {`${lastName} ${firstName}`} to PHILTECH ENROLLMENT SYSTEM
          </Typography>
          <Typography variant="subtitle2" color="primary">{`Current SY: 2023 / Current Semester:1`}</Typography>
        </Stack>
        <Stack sx={{ mt: 4 }}>
          <Typography color="primary" textAlign="center" variant="caption">
            It is recommended to logout by clicking the logout button everytime
            you leave your computer
          </Typography>
          <Typography color="primary" textAlign="center" variant="caption">
            If you do not agree with the conditions or you are not the current
            user, Please click logout now
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

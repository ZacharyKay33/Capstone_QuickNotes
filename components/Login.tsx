import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import { Grid, Stack, Typography, Button, Container } from "@mui/material";

const Login = () => {
  return (
    <Stack direction="row" sx={{ height: "720px" }}>
      {/* Main Container, controls direction and overall size */}
      <Grid container sx={{ bgcolor: "#81b29a", minHeight: "100%" }}>
        <Grid xs={6} sx={{ m: "auto" }} item>
          <AudiotrackOutlinedIcon sx={{ fontSize: 200 }} />
        </Grid>
      </Grid>
      <Grid container sx={{ bgcolor: "#a8dadc", minHeight: "100%" }}>
        {/*Might be a redundant container, sets color and minimum height */}
        <Stack
          direction="column"
          width="100%"
          spacing={3}
          my={"auto"}
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h2" mb={7}>
            Logo
          </Typography>
          <Container>
            {" "}
            {/*Centering*/}
            <Button variant="contained" sx={{ width: "80%", my: 2 }}>
              Login
            </Button>
            <Button variant="contained" sx={{ width: "80%", my: 2 }}>
              Sign Up
            </Button>
          </Container>
        </Stack>
      </Grid>
    </Stack>
  );
};
export default Login;

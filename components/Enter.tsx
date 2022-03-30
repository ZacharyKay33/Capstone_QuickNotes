import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import { Grid, Stack, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/router";

const Enter = () => {
  const router = useRouter();

  const clickLogin = () => {
    console.log("You clicked Login");
  };

  const clickSignUp = () => {
    router.push("/SignUp");
  };

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
            <Button
              variant="contained"
              sx={{ width: "80%", my: 2 }}
              onClick={clickLogin}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ width: "80%", my: 2 }}
              onClick={clickSignUp}
            >
              Sign Up
            </Button>
          </Container>
        </Stack>
      </Grid>
    </Stack>
  );
};
export default Enter;

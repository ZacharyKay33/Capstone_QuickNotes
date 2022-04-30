import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import { Grid, Stack, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";

const Enter = () => {
  const router = useRouter();

  //Define State
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVal, setEmailVal] = useState(false);
  const [passwordVal, setPasswordVal] = useState(false);
  const dispatch = useAppDispatch(); //Sends requests to the redux store

  //Functions
  const clickLogin = () => {
    router.push("/Login");
  };

  const clickSignUp = () => {
    router.push("/SignUp");
  };

  useEffect(() => {
    if (loading == true) {
    }
  }, [dispatch, email, loading, password]);

  return (
    <>
      <Stack direction="row" sx={{ height: "100vh" }}>
        {/* Main Container, controls direction and overall size */}
        <Grid container sx={{ bgcolor: "#81b29a", minHeight: "100%" }}>
          <Grid
            xs={6}
            sx={{
              m: "auto",
              display: "flex",
              height: "100vh",
              Width: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
            item
          >
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
            <Typography variant="h2" mb={7} sx={{ color: "white" }}>
              Quarter Notes
            </Typography>
            <Container>
              {" "}
              {/*Centering*/}
              <Button
                variant="contained"
                sx={{ width: "80%", my: 2, borderRadius: "20px" }}
                onClick={clickLogin}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "80%",
                  my: 2,
                  borderRadius: "20px",
                  backgroundColor: "black",
                }}
                onClick={clickSignUp}
              >
                Sign Up
              </Button>
            </Container>
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};
export default Enter;

import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
  Container,
  Stack,
  TextField,
  FormControl,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { SetStateAction, useState } from "react";
import { login } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";

const steps = ["Welcome!", "Login Info", "Wrapping Up"];

const SignUp = () => {
  //State
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState("");
  const [usernameVal, setUsernameVal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVal, setEmailVal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const formStarter = {
    variant: "standard",
    required: true,
  };
  const dispatch = useAppDispatch();

  //Functions
  const handleNext = () => {
    //Next step
    if (activeStep === 1) {
      setLoading(true);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //Signed In
          if (auth.currentUser !== null) {
            updateProfile(auth.currentUser, {
              displayName: username
            });
          }
          dispatch(
            login({
              uid: userCredential.user.uid,
              displayName: username,
              email: userCredential.user.email,
              phoneNumber: userCredential.user.phoneNumber,
              photoURL: userCredential.user.photoURL,
            })
          );
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          alert("Something went catastrophically wrong. Try again later?");
          console.log("Error Message - ", error.message);
        })
        .finally(() => {
          setUsername("");
          setPassword("");
          setEmail("");
          setLoading(false);
        });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    //Previous step
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    //Completing the flow
    router.push("/Home");
  };

  //State mutators
  const updUsername = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const updEmail = (event: { target: { value: SetStateAction<string> } }) => {
    setEmail(event.target.value);
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email).valueOf()) {
      setEmailVal(true);
    } else {
      setEmailVal(false);
    }
  };

  const updPassword = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const stepProps = {};
  const labelProps = {};
  return (
    <Container sx={{ my: 3 }}>
      <Stepper activeStep={activeStep}>
        <Step index={0} {...stepProps}>
          <StepLabel {...labelProps}>Welcome!</StepLabel>
        </Step>
        <Step index={1} {...stepProps}>
          <StepLabel {...labelProps}>Login Info</StepLabel>
        </Step>
        <Step index={2} {...stepProps}>
          <StepLabel {...labelProps}>Wrapping Up</StepLabel>
        </Step>
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Check your email for a confirmation - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleFinish}>Home</Button>
          </Box>
        </>
      ) : (
        <>
          {activeStep === 0 ? (
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Welcome to Quarter Notes
            </Typography>
          ) : activeStep === 1 ? (
            <Box sx={{ mx: "auto", width: "50%", my: 3 }}>
              <FormControl>
                <FormControl error={usernameVal}>
                  <TextField
                    id="username-input"
                    label="Username"
                    placeholder="Mellon Head"
                    value={username}
                    onChange={updUsername}
                    aria-label="Username"
                    inputProps={formStarter}
                  />
                </FormControl>
                <FormControl error={emailVal}>
                  <TextField
                    sx={{ mt: 4 }}
                    id="email-input"
                    label="Email"
                    placeholder="supercool@email.com"
                    value={email}
                    onChange={updEmail}
                    type="email"
                    aria-label="Email"
                    inputProps={formStarter}
                  />
                </FormControl>
                <FormControl error={passwordVal}>
                  <TextField
                    sx={{ mt: 4 }}
                    id="password-input"
                    label="Password"
                    value={password}
                    onChange={updPassword}
                    type="password"
                    inputProps={formStarter}
                    aria-label="Password"
                  />
                </FormControl>
              </FormControl>
            </Box>
          ) : (
            <Stack direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h4">Thank you for joining!</Typography>
              </Grid>
            </Stack>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext} disabled={loading}>
              {activeStep === steps.length - 1
                ? "Finish"
                : activeStep === steps.length - 2
                ? "Submit"
                : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SignUp;

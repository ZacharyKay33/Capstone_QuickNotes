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
import { getAuth, updateProfile } from "firebase/auth";
import { SetStateAction, useEffect, useState } from "react";
import { login } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { fbase } from "./api/Firebase";

const steps = ["Welcome!", "Login Info", "Wrapping Up"];

const SignUp = () => {
  //State
  const router = useRouter();
  const auth = getAuth();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const formStarter = {
    variant: "standard",
    required: true,
  };
  const dispatch = useAppDispatch();

  //Functions
  const handleNext = () => {
    //Next step
    if (activeStep === 1) {
      createUserWithEmailAndPassword(email, password)
        .then(() => {
          // Signed In
          if (auth.currentUser !== null) {
            updateProfile(auth.currentUser, {
              displayName: username,
            });
          }
          dispatch(
            login({
              uid: user?.user.uid,
              displayName: user?.user.displayName,
              email: user?.user.email,
              phoneNumber: user?.user.phoneNumber,
              photoURL: user?.user.photoURL,
            })
          );
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          // Error handling
          alert("Something went catastrophically wrong. Try again later?");
          if (error) {
            console.log("Error Message - ", error.message);
          }
        })
        .finally(() => {
          // Reset state
          setUsername("");
          setPassword("");
          setEmail("");
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

  useEffect(() => {
    if (user) {
      const reviewLocation = doc(getFirestore(fbase), "reviews", user.user.uid);
      setDoc(doc(getFirestore(fbase), "users", user.user.uid), {
        email: user.user.email,
        fname: fname,
        lname: lname,
        reviews: reviewLocation,
        username: username,
      })
        .then(() => {
          setDoc(reviewLocation, { reviews: [{}] });
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          // Reset state
          setUsername("");
          setPassword("");
          setEmail("");
          setFname("");
          setLname("");
        });
    } // eslint-disable-next-line
  }, [user]);

  //State mutators
  const updUsername = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const updEmail = (event: { target: { value: SetStateAction<string> } }) => {
    setEmail(event.target.value);
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
                <FormControl>
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
                <FormControl>
                  <TextField
                    id="first-name-input"
                    label="First Name"
                    placeholder="Sammy"
                    value={fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                    aria-label="First name"
                    inputProps={formStarter}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="last-name-input"
                    label="Last Name"
                    placeholder="Tunji"
                    value={lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                    aria-label="Last Name"
                    inputProps={formStarter}
                  />
                </FormControl>
                <FormControl>
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
                <FormControl>
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

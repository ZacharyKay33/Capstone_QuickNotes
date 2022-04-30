import {
  Button,
  Container,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  my: "auto",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth); // Pulling authentification helpers
  const dispatch = useAppDispatch(); //Sends requests to the redux store
  const router = useRouter();
  const formStarter = {
    variant: "standard",
    required: true,
  };

  const tryLogin = () => {
    signInWithEmailAndPassword(email, password)
      .then(() => {
        // Signed In
        updateState();
        router.push("/Home");
      })
      .catch((err) => {
        // Error handling
        alert("Something catastrophic happened, maybe try again? Or don't 😇");
        if (error) {
          console.log("Error Message - ", error.message);
        }
      })
      .finally(() => {
        // Reset state
        setEmail("");
        setPassword("");
      });
  };

  const updEmail = (event: { target: { value: SetStateAction<string> } }) => {
    setEmail(event.target.value);
  };

  const updPassword = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const updateState = () => {
    // Update state
    dispatch(
      login({
        uid: user?.user.uid,
        displayName: user?.user.displayName,
        email: user?.user.email,
        phoneNumber: user?.user.phoneNumber,
        photoURL: user?.user.photoURL,
      })
    );
    console.log("Current user's username" + user?.user.displayName);
  };

  return (
    <>
      {user !== null && user !== undefined ? (
        updateState()
      ) : (
        <Paper component={Container} elevation={3} sx={style}>
          <Stack direction="column">
            {/*Login form*/}
            <Typography variant="h5" mt={3}>
              Login
            </Typography>
            <FormControl sx={{ mt: 4 }}>
              <TextField
                id="email-input"
                label="Email"
                placeholder="supercool@gmail.com"
                value={email}
                onChange={updEmail}
                aria-label="Email"
                inputProps={formStarter}
              />
            </FormControl>
            <FormControl>
              <TextField
                sx={{ my: 4 }}
                id="password-input"
                label="Password"
                value={password}
                onChange={updPassword}
                type="password"
                inputProps={formStarter}
                aria-label="Password"
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{ mb: 5, width: "50%", mx: "auto" }}
              type="submit"
              disabled={loading}
              onClick={tryLogin}
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      )}
    </>
  );
};
export default Login;

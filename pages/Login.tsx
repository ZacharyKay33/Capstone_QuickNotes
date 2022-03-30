import {
  Button,
  Container,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  my: "auto",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVal, setEmailVal] = useState(false);
  const [passwordVal, setPasswordVal] = useState(false);
  const dispatch = useAppDispatch(); //Sends requests to the redux store
  const uid = useAppSelector((state) => state.user.uid);
  const auth = getAuth();
  const router = useRouter();

  const tryLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Signed In
        dispatch(
          login({
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            phoneNumber: userCredential.user.phoneNumber,
            photoURL: userCredential.user.photoURL,
          })
        );
        router.push("/Home");
      })
      .catch((error) => {
        alert("Something catastrophic happened, maybe try again? Or don't 😇");
        console.log(error.message);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
        setLoading(false);
      });
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

  const formStarter = {
    variant: "standard",
    required: true,
  };

  return (
    <Paper component={Container} elevation={3} sx={style}>
      <Stack direction="column">
        {/*Login form*/}
        <Typography variant="h5" mt={3}>
          Login
        </Typography>
        <FormControl error={emailVal} sx={{ mt: 4 }}>
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
        <FormControl error={passwordVal}>
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
  );
};
export default Login;

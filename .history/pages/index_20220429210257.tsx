import Enter from "../components/Enter";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch } from "../redux/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { login } from "../redux/userSlice";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

const Splash: NextPage = () => {
  const router = useRouter();
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  //Functions
  const updateState = () => {
    dispatch(
      login({
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        photoURL: user?.photoURL,
      })
    );
    console.log("Current user's username" + user?.displayName);
    router.push("/Home");
  };

  function SimpleSlide() {
    const [checked, setChecked] = React.useState(false);
  }

  return (
    <>
      {user !== null && user !== undefined ? ( //Check if we're authenticated
        updateState()
      ) : (
        <Enter />
      )}
    </>
  );
};

export default Splash;

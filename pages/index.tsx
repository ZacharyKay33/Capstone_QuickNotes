import Enter from "../components/Enter";
import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";

const Splash: NextPage = () => {
  const router = useRouter();

  //Page's state (data)
  const uid = useAppSelector(state => state.user.uid);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {uid !== "" && uid !== null && uid !== undefined ? ( //Check if we're authenticated
        router.push("/Home")
      ) : (
        <Enter />
      )}
    </>
  );
};

export default Splash;

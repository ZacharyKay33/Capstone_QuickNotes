import Enter from "../components/Enter";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Splash: NextPage = () => {
  const router = useRouter();
  //Page's state (data)
  const [isAuthed, setIsAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Side effect that fires whenever isAuthed is updated
  useEffect(() => {
    console.log("isAuthed is updated to - " + isAuthed);
  }, [isAuthed]);

  return (
    <>
      {isAuthed ? ( //Check if we're authenticated
        router.replace("/Home")
      ) : (
        <Enter />
      )}
    </>
  );
};

export default Splash;

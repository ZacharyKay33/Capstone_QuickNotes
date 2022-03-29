import { Grid, Typography } from "@mui/material";
import Login from "../components/Login";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

/* const LastFM = require("last-fm");
const lastfm = new LastFM(process.env.LASTFM_KEY, {
  userAgent: "QuarterNotes/0.0.1 (http://quarternotes.com)",
}); */

const Home: NextPage = () => {
  //Page's state (data)
  const [isAuthed, setIsAuthed] = useState(false);

  //Side effect that fires whenever isAuthed is updated
  useEffect(() => {
    console.log("isAuthed is updated to - " + isAuthed);
  }, [isAuthed]);

  return (
    <>
      {isAuthed ? ( //Check if we're authenticated
        <Grid container justifyContent="center">
          <Typography variant="h4">Home</Typography>
        </Grid>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;

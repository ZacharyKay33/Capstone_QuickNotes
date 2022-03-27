import { Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <>
      {isAuthed ? (
        <Grid container justifyContent="center">
          <Typography variant="h4">Home</Typography>
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <Typography variant="h4">Login</Typography>
        </Grid>
      )}
    </>
  );
};

export default Home;

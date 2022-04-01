import { Grid, Stack, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { SetStateAction, useState } from "react";

/* export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession()
    }, // Will be passed to the page component as props
  };
} */

const Home: NextPage = () => {
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const updSong = (event: { target: { value: SetStateAction<string> } }) => {
    setSong(event.target.value);
  };
  const updTitle = (event: { target: { value: SetStateAction<string> } }) => {
    setTitle(event.target.value);
  };
  const updReview = (event: { target: { value: SetStateAction<string> } }) => {
    setReview(event.target.value);
  };
  return (
    <Grid container justifyContent="center">
      <Stack direction="column" spacing={3}>
        <Typography variant="h4" align="center">
          Home
        </Typography>
        <TextField
          id="song-input"
          label="Song Title"
          placeholder="Super Bounce"
          value={song}
          onChange={updSong}
          aria-label="song-input"
          fullWidth
        />
        <TextField
          id="title-input"
          label="Review Title"
          placeholder="I think it's pretty sick"
          value={title}
          onChange={updTitle}
          aria-label="title-input"
          fullWidth
        />
        <TextField
          id="review-input"
          label="Review"
          placeholder="Mellon Head"
          value={review}
          onChange={updReview}
          aria-label="review-input"
          fullWidth
        />
      </Stack>
    </Grid>
  );
};

export default Home;

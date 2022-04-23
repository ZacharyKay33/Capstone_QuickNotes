import {
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { doc, updateDoc, arrayUnion, getFirestore } from "firebase/firestore";
import { NextPage } from "next";
import { SetStateAction, useState } from "react";
import Review from "../components/Review";

/* export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession()
    }, // Will be passed to the page component as props
  };
} */

const Home: NextPage = () => {
  //State definitions
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  //Functions
  const updSong = (event: { target: { value: SetStateAction<string> } }) => {
    setSong(event.target.value);
  };

  const updTitle = (event: { target: { value: SetStateAction<string> } }) => {
    setTitle(event.target.value);
  };

  const updReview = (event: { target: { value: SetStateAction<string> } }) => {
    setReview(event.target.value);
  };

  const submitReview = () => {
    console.log("Run the shits");
    setLoading(true);
    const db = getFirestore();
    const newReview = doc(db, "reviews", "all_reviews");

    updateDoc(newReview, {
      content: review,
      music: song,
      title: title,
    })
      .then(() => {
        alert(
          "Your message has successfully saved :) Congrats you're a critic"
        );
        setReview("");
        setTitle("");
        setSong("");
      })
      .catch((error) => {
        alert(
          "Unfortunately it didn't go through, write better reviews.\n" +
            error.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid
        component={Paper}
        item
        xs={8}
        sx={{ height: "500px", my: 6, mx: "auto" }}
        variant="outlined"
      >
        <Review />
      </Grid>
      <Grid item xs={4} sx={{ p: 5 }}>
        <Stack direction="column" spacing={3}>
          <Typography variant="h4" align="center">
            Home
          </Typography>
          <Typography variant="h4" align="center"></Typography>
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
          <Button onClick={submitReview} disabled={loading}>
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;

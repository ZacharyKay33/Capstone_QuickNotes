import {
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  Paper,
  AlertTitle,
  Alert,
  FormControl,
} from "@mui/material";
import {
  doc,
  updateDoc,
  getFirestore,
  collection,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import Review from "../components/Review";
import { fbase } from "./api/Firebase";
import Navbar from "../components/Navbar";

//Type definitions
type Review = {
  rID: string;
  review: {
    authorID: string;
    title: string;
    content: string;
    dateCreated: Date;
    votes: number;
  };
  id?: string;
};

const reviewConverter: FirestoreDataConverter<Review> = {
  toFirestore(review: Review): DocumentData {
    return { ...review };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Review {
    const data = snapshot.data();
    return { ...data, id: snapshot.id } as Review;
  },
};

const Home: NextPage = () => {
  //State definitions
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [value, loading, error] = useCollectionDataOnce(
    collection(getFirestore(fbase), "reviews").withConverter(reviewConverter)
  );

  //Functions
  const updSong = (event: { target: { value: SetStateAction<string> } }) => {
    setSong(event.target.value);
  };

  const updTitle = (event: { target: { value: SetStateAction<string> } }) => {
    setTitle(event.target.value);
  };

  const updReview = (event: { target: { value: SetStateAction<string> } }) => {
    setReviewContent(event.target.value);
  };

  const submitReview = () => {
    console.log("Run the shits");
    setSubmitLoading(true);
    const db = getFirestore();
    const newReview = doc(db, "reviews", "all_reviews");

    updateDoc(newReview, {
      content: reviewContent,
      music: song,
      title: title,
    })
      .then(() => {
        alert(
          "Your message has successfully saved :) Congrats you're a critic"
        );
        setReviewContent("");
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
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    console.log("error - ", error);
    console.log("value - ", value);
    console.log("loading - ", loading);
  }, [value, loading, error]);

  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center">
      <Navbar />
      <Grid
        component={Paper}
        item
        xs={8}
        sx={{ height: "500px", my: 6, mx: "auto" }}
        variant="outlined"
      >
        {value && value.length > 0 ? (
          value.map((review) => {
            return (
              <>
                <Review
                  key={review.id}
                  title={review.review.title}
                  body={review.review.content}
                />
              </>
            );
          })
        ) : (
          <Alert severity="warning">
            <AlertTitle>Review Problem</AlertTitle>Looks like something went
            wrong, try again later?
          </Alert>
        )}
      </Grid>
      <Grid item xs={4} sx={{ p: 5 }}>
        <Stack direction="column" spacing={3}>
          <Typography variant="h4" align="center">
            Home
          </Typography>
          <Typography variant="h4" align="center"></Typography>
          <FormControl>
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
              sx={{ mt: 3 }}
            />
            <TextField
              id="review-input"
              label="Review"
              placeholder="Mellon Head"
              value={reviewContent}
              onChange={updReview}
              aria-label="review-input"
              fullWidth
              sx={{ mt: 3 }}
            />
          </FormControl>
          <Button onClick={submitReview} disabled={submitLoading}>
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;

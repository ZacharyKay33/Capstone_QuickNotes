import { RecordVoiceOverTwoTone } from "@mui/icons-material";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  Paper,
  AlertTitle,
  Alert,
} from "@mui/material";
import {
  doc,
  updateDoc,
  getFirestore,
  collection,
  FirestoreDataConverter,
  WithFieldValue,
  SnapshotOptions,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Review from "../components/Review";
import { fbase } from "./api/Firebase";

const Home: NextPage = () => {
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
  };

  const reviewConverter: FirestoreDataConverter<Review> = {
    toFirestore(review: WithFieldValue<Review>): DocumentData {
      return {
        rID: review.rID,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Review {
      const data = snapshot.data(options);
      return {
        rID: data.rID,
        review: {
          authorID: data.review.authorID,
          title: data.review.title,
          content: data.review.content,
          votes: data.review.votes,
          dateCreated: data.review.date_created,
        },
      };
    },
  };

  //State definitions
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [value, loading, error] = useCollectionData(
    collection(getFirestore(fbase), "reviews").withConverter(reviewConverter)
  );

  //Functions
  const submitReview = () => {
    console.log("Run the shits");
    setSubmitLoading(true);
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
      <Grid
        component={Paper}
        item
        xs={8}
        sx={{ height: "500px", my: 6, mx: "auto" }}
        variant="outlined"
      >
        {value !== undefined ? (
          value.map((review) => (
            <Review
              key={review.rID}
              title={review.review.title}
              body={review.review.content}
            />
          ))
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
          <TextField
            id="song-input"
            label="Song Title"
            placeholder="Super Bounce"
            value={song}
            onChange={(e) => {
              setSong(e.target.value);
            }}
            aria-label="song-input"
            fullWidth
          />
          <TextField
            id="title-input"
            label="Review Title"
            placeholder="I think it's pretty sick"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            aria-label="title-input"
            fullWidth
          />
          <TextField
            id="review-input"
            label="Review"
            placeholder="Mellon Head"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            aria-label="review-input"
            fullWidth
          />
          <Button onClick={submitReview} disabled={submitLoading}>
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;

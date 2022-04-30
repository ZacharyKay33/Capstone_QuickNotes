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
  getFirestore,
  collection,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { NextPage } from "next";
import { SetStateAction, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Review from "../components/Review";
import { fbase } from "./api/Firebase";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../redux/hooks";
import { logout } from "../redux/userSlice";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

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
  toFirestore(review: Review): DocumentData {
    return { ...review };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Review {
    const data = snapshot.data();
    return { ...data } as Review;
  },
};

const Home: NextPage = () => {
  //State definitions
  const [song, setSong] = useState("");
  const [title, setTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [value] = useCollectionData(
    collection(getFirestore(fbase), "reviews").withConverter(reviewConverter)
  );
  const [user] = useAuthState(getAuth(fbase));
  const router = useRouter();

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

  const submitReview = async () => {
    console.log("Start submission");
    setSubmitLoading(true);

    if (!user) {
      alert("Hmm, you're not logged in.");
      logout();
      router.replace("/");
      return;
    }

    const reviewRef = addDoc(collection(getFirestore(), "reviews"), {
      rID: "",
      review: {
        authorID: user.uid,
        title: title,
        content: reviewContent,
        dateCreated: serverTimestamp(),
        votes: 0,
      },
    })
      .then((ref) => {
        console.log("You successfully posted a review, congrats!");
        updateDoc(ref, { rID: ref.id });
      })
      .catch((error) => {
        console.error(
          "Something went wrong during document setting",
          error.message
        );
      })
      .finally(() => {
        setSong("");
        setTitle("");
        setReviewContent("");
        setSubmitLoading(false);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center">
        <Navbar />
      </Grid>
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
                  key={review.rID}
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

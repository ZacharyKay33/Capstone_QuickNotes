import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import {
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
} from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import { fbase } from "../pages/api/Firebase";
import React from "react";

const Review = () => {
  // Component state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  type reviewList = [
    {
      reviewDoc: DocumentReference<DocumentData>;
      uid: string;
    }
  ];

  /* const reviewConverter: FirestoreDataConverter<reviewList> = {
    toFirestore(review: WithFieldValue<reviewList>): DocumentData {
      return { uid: review.uid };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): reviewList {
      const data = snapshot.data(options);
      return {
        reviewDoc: snapshot.ref,
        uid: data.uid,
      };
    },
  }; */

  const allReviews = doc(getFirestore(fbase), "/reviews/reviews");

  const [value, loading, error] = useDocumentDataOnce(allReviews);

  useEffect(() => {
    console.log("value - ", value);
    console.log("loading - ", loading);
    console.log("error - ", error);
  }, [value, loading, error]);

  return (
    <Card sx={{ display: "flex" }}>
      <Avatar sx={{ width: 100, height: 100, m: 3 }}>Test</Avatar>
      <CardContent sx={{ display: "grid", my: 3 }}>
        <Stack direction="column" spacing={2}>
          <Typography>Review Title</Typography>
          <Typography>Review Body</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Review;

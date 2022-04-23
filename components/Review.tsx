import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { fbase } from "../pages/api/Firebase";
import React from "react";

const Review = () => {
  // Component state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [value, loading, error] = useDocument(
    doc(getFirestore(fbase), "reviews/reviews")
  );

  return (
    <Card sx={{ display: "flex" }}>
      <Avatar sx={{ width: 100, height: 100, m: 3 }}>Test</Avatar>
      <CardContent sx={{ display: "grid", my: 3 }}>
        <Stack direction="column" spacing={2}>
          {value?.get..map(() => (
            <React.Fragment key={review.id}>
              <Typography>Review Title</Typography>
              <Typography>Review Body</Typography>
            </React.Fragment>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Review;

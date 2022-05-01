import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import React, { SetStateAction, useState } from "react";

type Review = {
  rID: string;
  review: {
    authorID: string;
    title: string;
    content: string;
    songId: string;
    comments: [
      {
        content: string;
        uid: string;
      }?
    ];
    artistName: string;
    dateCreated: Date;
  };
};

const ReviewBox = (props: Review) => {
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");

  const submitComment = () => {
    console.log("Submitting comment to db");
    setCommenting(false);
  };

  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <CardContent sx={{ display: "flex", my: 2 }}>
        <Avatar sx={{ width: 100, height: 100, m: 3 }}>Test</Avatar>
        <Stack direction="column" spacing={0}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">{props.review.songId}</Typography>
            <Typography variant="h6">-</Typography>
            <Typography variant="h6">{props.review.artistName}</Typography>
          </Stack>
          <Typography>{props.review.title}</Typography>
          <Typography>{props.review.content}</Typography>
          {commenting ? (
            <>
              <TextField
                id="comment"
                label="comment"
                multiline
                maxRows={4}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button variant="outlined" onClick={submitComment}>
                Submit
              </Button>
            </>
          ) : (
            <></>
          )}
        </Stack>
      </CardContent>
      <CardActions
        sx={{ flexStart: "end" }}
        onClick={() => {
          setCommenting(!commenting);
        }}
      >
        <IconButton aria-label="Like">
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ReviewBox;

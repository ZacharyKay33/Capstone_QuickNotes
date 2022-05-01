import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

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
        votes: number;
      }?
    ];
    artistName: string;
    dateCreated: Date;
    votes: number;
  };
};

const ReviewBox = (props: Review) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Avatar sx={{ width: 100, height: 100, m: 3 }}>Test</Avatar>
      <CardContent sx={{ display: "grid", my: 2 }}>
        <Stack direction="column" spacing={0}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">{props.review.songId}</Typography>
            <Typography variant="h6">-</Typography>
            <Typography variant="h6">{props.review.artistName}</Typography>
          </Stack>
          <Typography>{props.review.title}</Typography>
          <Typography>{props.review.content}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewBox;

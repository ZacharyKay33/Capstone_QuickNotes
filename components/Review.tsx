import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

type reviewProps = {
  title: string;
  body: string;
  songId: string;
  artistName: string;
};

const Review = (props: reviewProps) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Avatar sx={{ width: 100, height: 100, m: 3 }}>Test</Avatar>
      <CardContent sx={{ display: "grid", my: 2 }}>
        <Stack direction="column" spacing={0}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">{props.songId}</Typography>
            <Typography variant="h6">-</Typography>
            <Typography variant="h6">{props.artistName}</Typography>
          </Stack>
          <Typography>{props.title}</Typography>
          <Typography>{props.body}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Review;

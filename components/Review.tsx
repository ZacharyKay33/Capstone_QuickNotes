import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

type reviewProps = {
  title: string;
  body: string;
};

const Review = (props: reviewProps) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Avatar sx={{ width: 100, height: 100, m: 3 }}>Test</Avatar>
      <CardContent sx={{ display: "grid", my: 3 }}>
        <Stack direction="column" spacing={2}>
          <Typography>{props.title}</Typography>
          <Typography>{props.body}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Review;

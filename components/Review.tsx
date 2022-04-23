import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Review = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

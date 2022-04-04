import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
  Stack,
  Box,
  Input,
  TextField,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import "./api/Firebase"; //W peace and love

const Profile = () => {
  //State definitions
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState("Jared");
  const [bio, setBio] = useState("Jared's Biography");

  //Functions
  const updUsername = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    if (profilePic) {
      setImageUrl(URL.createObjectURL(profilePic));
    }
  }, [profilePic]);

  return (
    <Paper elevation={4}>
      <Stack spacing={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Profile
        </Typography>
        <Box>
          {imageUrl ? (
            <Avatar
              sx={{ width: 200, height: 200, m: "auto" }}
              src={imageUrl}
            />
          ) : (
            <Avatar sx={{ width: 200, height: 200, m: "auto" }} src="">
              T
            </Avatar>
          )}
        </Box>
        <Typography align="center">{username}</Typography>
        <Typography align="center">{bio}</Typography>
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
        <Button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {editing ? "Done Editing" : "Edit Profile"}
        </Button>
        {editing ? (
          <>
            <Grid container>
              <TextField label="username" onChange={updUsername} />
            </Grid>
            <Grid container>
              <TextField label="bio" fullWidth />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Paper>
  );
};

export default Profile;

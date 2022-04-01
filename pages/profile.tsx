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
    ListItemAvatar,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
  import { SetStateAction, useEffect, useState } from "react";
  import "./api/Firebase"; //W peace and love
  import RateReviewIcon from '@mui/icons-material/RateReview';
  import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

  const Profile = () => {
    //State definitions
    const [editing, setEditing] = useState(false);  //check if user is editing profile variables
    const [profilePic, setProfilePic] = useState(null); //set profile pic from user variables
    const [imageUrl, setImageUrl] = useState(null); //change image to imageurl variables
    const [username, setUsername] = useState("Jared"); //change username variables
    const [bio, setBio] = useState("Jared's Bio"); //change bio variables
  
    //Functions
    const updUsername = (event: {
      target: { value: SetStateAction<string> }; //check if updating username
    }) => {
      setUsername(event.target.value);
    };

    const updBio = (event: {
        target: { value: SetStateAction<string> }; //check if updating bio
    }) => {
        setBio(event.target.value);
    };
  
    useEffect(() => { 
      if (profilePic) {
        setImageUrl(URL.createObjectURL(profilePic)); //change image to image url
      }
    }, [profilePic]);
  
    //create new page for profile
    return (
      <Paper elevation={4}> 
        <Stack spacing={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Profile
          </Typography>
          <Box>
            {imageUrl ? ( //if there is a image 
              <Avatar
                sx={{ width: 200, height: 200, m: "auto" }} //set image in the center and big
                src={imageUrl} //display image from user
              />
            ) : ( //if there is no image to display
              <Avatar sx={{ width: 200, height: 200, m: "auto" }} src="">
                P 
              </Avatar> //set profile pic to the letter P
            )}
          </Box>
          <Typography align="center">{username}</Typography> 
          <Typography align="center">{bio}</Typography>
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])} //input for image file
          />
          <Button
            onClick={() => {
              setEditing(!editing); //if user clicks edit profile change to done editing button
            }}
          >
            {editing ? "Done Editing" : "Edit Profile"}
          </Button>
          {editing ? ( //change username or bio to inputted words
            <>
              <Grid container> 
                <TextField label="username" onChange={updUsername} /> 
              </Grid>
              <Grid container>
                <TextField fullWidth label="bio" onChange={updBio} />
              </Grid>
            </>
          ) : (
            <></>
          )}
          <List sx ={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <RateReviewIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary = "Reviews" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LibraryMusicIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary = "Playlists" />
            </ListItem>
          </List>
        </Stack>
      </Paper>
    );
  };
  
  export default Profile;
  
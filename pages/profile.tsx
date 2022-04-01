import {
  Grid,
  Paper,
  List,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControl,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import "./api/Firebase";

/* class profile extends React.Component{
    state = {
        user: null
    };

    componentDidMount() {
        const {uid} = this.props

        const isauth = auth.user.id == uid;
        getUser(uid).then(user =>{
            this.setState({
                user,
                isauth
            });
        });
    }

    render(){

        const{classes} = this.props;
        const{user, isauth} = this.state;
        return(
            <Paper className = {classes.root} elevation = {4}>
                <Typography
                    variant = "h4"
                    component "h1"
                    align = "center"
                    className = {classes.title}
                    gutterBottom
                    >
                    
                    profile
                    </Typography>
                (
                <List dense>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src = {user.avatar} className = {classes.bigAvatar} /> 
                        </ListItemAvatar>
                        <ListItemText primary = {user.name} secondary = {user.bio} />
                    </ListItem>
                </List>
                )
            </Paper>
        ) 
        
    }
} */

//const profile = () => {

//}

const Profile = () => {
  return (
    <Paper elevation={4}>
      <Stack spacing={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Profile
        </Typography>
        <Avatar sx={{ width: 200, height: 200 }}>T</Avatar>
        <Typography>User.name</Typography>
        <Typography>User.bio</Typography>
      </Stack>
    </Paper>
  );
};

export default Profile;

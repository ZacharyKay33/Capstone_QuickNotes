import {Grid, Paper, List, Avatar, Edit, Typography, TextField, Button, FormControl} from "@mui/material";
import {getUser} from '../pages/api/DB'

class profile extends React.Component{
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
}

//const profile = () => {

//}
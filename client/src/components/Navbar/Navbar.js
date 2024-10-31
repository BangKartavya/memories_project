import React, {useState,useEffect} from 'react';
import { AppBar, Avatar, Toolbar, Typography,Button } from "@material-ui/core";
import useStyles from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const location = useLocation();

    const logout = (e) => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to ="/" className={classes.brandContainer}>
                <img className = {classes.image} src={memoriesText} alt = "memoriesText" height = "45px"/>
                <img className={classes.image} src={memoriesLogo} alt="memoriesLog" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
                        <Button variant = "contained" className = {classes.logout} color = "secondary" onClick = {logout}>Logout</Button>
                    </div>
                ): (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
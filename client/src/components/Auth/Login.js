import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';
import { InvalidTokenError ,jwtDecode} from 'jwt-decode';

import useStyles from './styles';

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (res) => {
        const token = res?.credential;
        const result = jwtDecode(token);


        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    };


    const handleError = (error) => {
        console.error("Login Failed", error);
    }

    return (
        <div>
            <GoogleLogin
                onSuccess={handleLogin}
                onError={handleError}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
                )}
                />
        </div>
    )
    
};

export default Login;
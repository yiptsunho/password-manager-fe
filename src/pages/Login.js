import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as ApiConst from '../utils/ApiConst';
import { PasswordContext } from '../App'
import axios from '../utils/axiosInstance';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// async function getData(url, params, setState) {
//     await axios.get(url, params)
//         .then(response => response.json())
//         .then(data => {
//             return data
//         });
// }

async function login(url, params, setState) {
    let responseData = null;

    try {
        responseData = await axios.post(url, params);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData.status === 200) {
        console.log(responseData)
        console.log('login success')
    } else {
        console.log(responseData)
        console.log('login failed')
    }


    // axios.post(url, params)
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

}

const theme = createTheme();

function Login(props) {

    const { fetchData, isLogin, setIsLogin } = React.useContext(PasswordContext);
    const navigate = useNavigate()
    const [loginId, setLoginId] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeLoginId = (val) => {
        setLoginId(val)
    }

    const handleChangePassword = (val) => {
        setPassword(val)
    }

    const handleSubmit = (loginId, password) => {

        const params = {
            loginId: loginId,
            password: password
        }

        login(ApiConst.LOGIN, params, setIsLogin)
        // const res = login(ApiConst.LOGIN, params, setIsLogin)
        // if (res === true) {
        //     setIsLogin(true)
        //     navigate("/landing")
        // } else {
        //     setIsLogin(false)
        // }

        // fetchData(LOGIN, params, setIsLogin)
        console.log(params)
    };

    // useEffect(() => {
    //     if (isLogin) {
    //         console.log("login successful")
    //     } else {
    //         console.log("still pending login")
    //     }
    // }, [isLogin])

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginId}
                            onChange={(e) => handleChangeLoginId(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => handleChangePassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => handleSubmit(loginId, password)}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Login;
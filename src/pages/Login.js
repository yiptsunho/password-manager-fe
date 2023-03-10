import React from 'react';
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
import { LoginContext } from '../App'
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from 'react';
import CustomDialog from '../components/CustomDialog';
import { login } from '../apis/UserApi'

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

const theme = createTheme();

function Login(props) {

    const { isLogin, setIsLogin, refreshToken } = useContext(LoginContext);
    const navigate = useNavigate()
    const [loginId, setLoginId] = useState('')
    const [password, setPassword] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('Login failed')
    const dialogContent = useRef('Email or password incorrect')

    useEffect(() => {
        window.sessionStorage.clear()
    }, [])

    const handleChangeLoginId = (val) => {
        setLoginId(val)
    }

    const handleChangePassword = (val) => {
        setPassword(val)
    }

    const handleSubmit = (event) => {

        event.preventDefault()
        const params = {
            loginId: loginId,
            password: password
        }

        login(params, setIsLogin, navigate, setOpenDialog, refreshToken)
    };

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
                    <form onSubmit={handleSubmit}>
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
                                type="submit"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgotpassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/createnewaccount" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <CustomDialog
                                open={openDialog}
                                setOpen={setOpenDialog}
                                title={dialogTitle.current}
                                content={dialogContent.current}
                            />
                        </Box>
                    </form>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Login;
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function ForgetPassword() {

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    This is the forget password page
                </Typography>
            </Container>
        </ThemeProvider>
    )
}

export default ForgetPassword;
import React, { createContext, useEffect, useState } from 'react';
import PasswordTable from './PasswordTable';
import { getAllPasswords } from '../apis/PasswordApi';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';

const theme = createTheme();

export const PasswordContext = createContext();

function ManagePassword() {

    const [passwords, setPasswords] = useState([])

    useEffect(() => {
        getAllPasswords({ userId: window.sessionStorage.getItem('userId') }, setPasswords)
    }, [])

    return (
        <PasswordContext.Provider value={{ passwords: passwords, setPasswords: setPasswords }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container height='100%' maxWidth="lg">
                    <h1>This is the manage password page</h1>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <PasswordTable
                            passwords={passwords}
                        />
                    </Box>
                </Container>
            </ThemeProvider>
        </PasswordContext.Provider>
    )
}

export default ManagePassword;
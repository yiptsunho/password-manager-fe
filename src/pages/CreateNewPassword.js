import React, { useState, useContext, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { createNewPassword } from '../apis/PasswordApi';
import PasswordForm from '../components/PasswordForm';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CustomDialog from '../components/CustomDialog';
import { PASSWORD } from '../utils/Constants'
import GeneratePassword from '../components/GeneratePassword';

const theme = createTheme();

function CreateNewPassword(props) {
    const userId = window.sessionStorage.getItem('userId')
    const { setPasswords } = props;
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')
    const dialogRightAction = useRef('')

    const handleSubmitAdd = (form) => {
        const { appName, loginId, password, category } = form;

        const { isValid, errMsg } = validate(form)
        if (isValid) {

            createNewPassword(
                {
                    payload: {
                        appName: appName,
                        loginId: loginId,
                        password: password,
                        category: category,
                        userId: userId
                    },
                    setPasswords: setPasswords
                })
            navigate('/managepassword')

        } else {

            setOpenDialog(true)
            dialogTitle.current = PASSWORD.WARNING
            dialogContent.current = errMsg

        }
    }

    const validate = (passwordProfile) => {
        let isValid = true
        let errMsg = ''
        const { appName, loginId, password, category } = passwordProfile

        if (!appName.trim() || !loginId.trim() || !password.trim() || !category.trim()) {
            isValid = false
            errMsg = 'Please input all mandatory field(s)'
        }

        return ({ isValid, errMsg })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <CssBaseline />
                <PasswordForm
                    handleSubmit={handleSubmitAdd}
                    formTitle='Create New Password'
                />
                <br />
                <br />
                <br />
                <br />
                <Container maxWidth="sm">
                    <h1>You can generate your own customized password here!</h1>
                    <GeneratePassword />
                </Container>
                <CustomDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    title={dialogTitle.current}
                    content={dialogContent.current}
                    rightLabel='OK'
                />
            </Container>
        </ThemeProvider>
    )
}

export default CreateNewPassword;

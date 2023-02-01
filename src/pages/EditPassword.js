import React, { useState, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editPassword } from '../apis/PasswordApi';
import PasswordForm from '../components/PasswordForm';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CustomDialog from '../components/CustomDialog';
import { PASSWORD } from '../utils/Constants';
import GeneratePassword from '../components/GeneratePassword';

const theme = createTheme();

function EditPassword({ props }) {
    const appData = useLocation();
    const data = appData.state.data
    const userId = window.sessionStorage.getItem('userId')
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')
    const dialogRightAction = useRef('')

    const handleSubmitEdit = (passwordProfile) => {
        const { id, appName, loginId, password, category } = passwordProfile;

        const { isValid, errMsg } = validate(passwordProfile)
        if (isValid) {

            editPassword(
                {
                    payload: {
                        id: id,
                        appName: appName,
                        loginId: loginId,
                        password: password,
                        category: category,
                        userId: userId
                    }
                })
            navigate('/managepassword')

        } else {

            setOpenDialog(true)
            dialogTitle.current = 'Testing'
            dialogContent.current = errMsg

        }
    }

    const validate = (passwordProfile) => {
        let isValid = true
        let errMsg = ''
        const { appName, loginId, password, category } = passwordProfile

        if (!appName || !loginId || !password || !category) {
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
                    data={data}
                    handleSubmit={handleSubmitEdit}
                    formTitle='Edit Password'
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

export default EditPassword;
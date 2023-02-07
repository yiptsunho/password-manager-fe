import { Button } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewAccount } from '../apis/UserApi'
import CustomDialog from '../components/CustomDialog';
import UserForm from '../components/UserForm';
import { USER } from '../utils/Constants';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import GeneratePassword from '../components/GeneratePassword';

const theme = createTheme();

function CreateNewAccount() {
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')
    const dialogRightAction = useRef('')

    const handleSubmitCreateUser = (form) => {
        const { loginId, password, displayName } = form;

        const { isValid, errMsg } = validate(form)
        if (isValid) {
            const params = {
                loginId: loginId,
                password: password,
                displayName: displayName
            }

            createNewAccount(params, setOpenDialog, dialogTitle, dialogContent, dialogRightAction, navigate)

        } else {

            setOpenDialog(true)
            dialogTitle.current = USER.WARNING
            dialogContent.current = errMsg

        }
    }

    const validate = (userDetails) => {
        let isValid = true
        let errMsg = ''
        const { loginId, password, displayName } = userDetails

        if (!loginId.trim() || !password.trim() || !displayName.trim()) {
            isValid = false
            errMsg = 'Please input all mandatory field(s)'
        }

        return ({ isValid, errMsg })
    }

    const handleCreateNewAccount = (params) => {
        createNewAccount(params, setOpenDialog, dialogTitle, dialogContent, dialogRightAction, navigate)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <CssBaseline />
                {/* <h1>This is the Create New Account page</h1>
                <Button onClick={() => setOpenDialog(true)}>
                    Create New Account
                </Button> */}
                <UserForm
                    handleSubmit={handleSubmitCreateUser}
                    formTitle='Create new account'
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
                    rightLabel='Confirm'
                    rightAction={dialogRightAction.current}
                    leftLabel='Cancel'
                />
            </Container>
        </ThemeProvider>
    )
}

export default CreateNewAccount;
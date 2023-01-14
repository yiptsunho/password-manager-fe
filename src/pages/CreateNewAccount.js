import { Button } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewAccount } from '../apis/UserApi'
import CustomDialog from '../components/CustomDialog';

function CreateNewAccount() {
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')
    const dialogRightAction = useRef('')

    const handleCreateNewAccount = (params) => {
        createNewAccount(params, setOpenDialog, dialogTitle, dialogContent, dialogRightAction, navigate)
    }

    return (
        <div className="App-header">
            <div className="container">
                <h1>This is the Create New Account page</h1>
                <Button onClick={() => handleCreateNewAccount()}>
                    Create New Account
                </Button>
                <CustomDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    title={dialogTitle.current}
                    content={dialogContent.current}
                    rightLabel='Confirm'
                    rightAction={dialogRightAction.current}
                    leftLabel='Cancel'
                />
            </div>
        </div>
    )
}

export default CreateNewAccount;
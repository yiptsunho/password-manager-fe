import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/AddCircle';
import { useState, useEffect, useRef, useContext } from 'react';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import CustomDialog from '../components/CustomDialog';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { password } from '../utils/Constants';
import { createNewPassword, editPassword, deletePassword } from '../apis/PasswordApi';
import { PasswordContext } from './ManagePassword';

function CustomContent(props, ref) {
    const { passwordProfile, handleChange, categoryList } = props;



    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            textAlign='center'
        >
            <TextField
                required
                id="appName"
                label="Application"
                onChange={(e) => handleChange(passwordProfile, e.target.id, e.target.value)}
            />
            <TextField
                required
                id="loginId"
                label="Username"
                onChange={(e) => handleChange(passwordProfile, e.target.id, e.target.value)}
            />
            <TextField
                required
                id="password"
                label="Password"
                type="password"
                onChange={(e) => handleChange(passwordProfile, e.target.id, e.target.value)}
            />
            <TextField
                id="category"
                select
                required
                label="Category"
                name='category'
                onChange={(e) => handleChange(passwordProfile, e.target.name, e.target.value)}
            >
                {categoryList.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                        {category.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}

function PasswordTable(props) {
    const { passwords } = props;
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')
    const dialogRightAction = useRef('')
    const { setPasswords } = useContext(PasswordContext);

    const emptyPasswordProfile = {
        appName: '',
        loginId: '',
        password: '',
        category: '',
        userId: window.sessionStorage.getItem('userId')
    }

    const tableColumns = [
        {
            field: 'id',
            headerName: '#',
            width: 40
        },
        {
            field: 'appName',
            headerName: 'Application',
            width: 150,
            editable: false,
        },
        {
            field: 'loginId',
            headerName: 'Username',
            width: 200,
            editable: false,
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 110,
            editable: false,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 100,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: ((params) => {
                return (
                    <ButtonGroup variant="text" aria-label="outlined primary button group" >
                        <React.Fragment>
                            <Tooltip title="Edit password">
                                <Button onClick={() => handleEdit(
                                    // {
                                    //     id: params.getValue(params.id, 'id'),
                                    //     appName: params.getValue(params.id, 'appName'),
                                    //     loginId: params.getValue(params.id, 'loginId'),
                                    //     password: params.getValue(params.id, 'password'),
                                    //     category: params.getValue(params.id, 'category')
                                    // }
                                )}>
                                    <Edit />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Delete password">
                                <Button onClick={() => handleDelete(params.getValue(params.id, 'id'))}>
                                    <Delete />
                                </Button>
                            </Tooltip>
                        </React.Fragment>
                    </ButtonGroup >
                )
            })
        },
    ];

    const handleChange = (passwordProfile, field, newValue) => {
        passwordProfile[field] = newValue
        console.log(passwordProfile)
    }

    // TODO: fetch using api
    const categoryList = [
        {
            value: 'work',
            label: 'Work'
        },
        {
            value: 'game',
            label: 'Game'
        },
        {
            value: 'personal',
            label: 'Personal'
        },
    ]

    const handleAdd = () => {
        setOpenDialog(true)
        dialogTitle.current = password.add.title
        dialogContent.current = <CustomContent
            passwordProfile={emptyPasswordProfile}
            handleChange={handleChange}
            categoryList={categoryList}
            ref
        />
        dialogRightAction.current = (params) => handleConfirmAdd(params)
    }

    const handleEdit = (passwordId) => {
        const originalPasswordProfile = passwords.filter(password => password.id === passwordId)
        setOpenDialog(true)
        dialogTitle.current = password.edit.title
        dialogContent.current = <customContent
            passwordProfile={originalPasswordProfile}
            handleChange={handleChange}
            categoryList={categoryList}
        />
        dialogRightAction.current = (params) => handleConfirmEdit(params)
    }

    const handleDelete = (params) => {
        setOpenDialog(true)
        dialogTitle.current = password.delete.title
        dialogContent.current = password.delete.content
        dialogRightAction.current = () => handleConfirmDelete(params)
    }

    const handleConfirmAdd = (passwordProfile) => {
        const { appName, loginId, password, category } = passwordProfile;

        createNewPassword(
            {
                payload: {
                    appName: appName,
                    loginId: loginId,
                    password: password,
                    category: category,
                    userId: window.sessionStorage.getItem('userid')
                },
                setPasswords: setPasswords
            })
        setOpenDialog(false)
        console.log(`Creating new password with appName = ${appName}, loginId = ${loginId}, password = ${password}, category = ${category},`)
    }

    const handleConfirmEdit = (passwordProfile) => {
        const { id, appName, loginId, password, category } = passwordProfile;

        editPassword(
            {
                payload: {
                    id: id,
                    appName: appName,
                    loginId: loginId,
                    password: password,
                    category: category,
                    userId: window.sessionStorage.getItem('userid')
                },
                setPasswords: setPasswords
            })
        setOpenDialog(false)
        console.log(`Editing password to appName = ${appName}, loginId = ${loginId}, password = ${password}, category = ${category},`)
    }

    const handleConfirmDelete = (id) => {
        deletePassword(
            {
                payload: {
                    id: id
                },
                setPasswords: setPasswords
            })
        setOpenDialog(false)
        console.log(`Delete password with id = ${id},`)
    }

    // const getData = () => {
    //     const newData = refDialog.current
    //     return newData
    // }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Button onClick={() => handleAdd()} variant="text">
                <Add />
            </Button>
            <DataGrid
                rows={passwords}
                columns={tableColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
            <CustomDialog
                open={openDialog}
                setOpen={setOpenDialog}
                title={dialogTitle.current}
                content={dialogContent.current}
                rightLabel='Confirm'
                rightAction={dialogRightAction.current}
                leftLabel='Cancel'
            />
        </Box>
    );
}

export default PasswordTable;
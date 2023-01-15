import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/AddCircle';
import { useState, useRef, useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import CustomDialog from '../components/CustomDialog';
import { password } from '../utils/Constants';
import { deletePassword } from '../apis/PasswordApi';
import { PasswordContext } from './ManagePassword';
import { useNavigate } from 'react-router-dom';

function PasswordTable(props) {
    const { passwords } = props;
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')
    const dialogRightAction = useRef('')
    const { setPasswords } = useContext(PasswordContext);
    const navigate = useNavigate();

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
                                    {
                                        id: params.getValue(params.id, 'id'),
                                        appName: params.getValue(params.id, 'appName'),
                                        loginId: params.getValue(params.id, 'loginId'),
                                        password: params.getValue(params.id, 'password'),
                                        category: params.getValue(params.id, 'category')
                                    }
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

    const handleAdd = () => {
        navigate('/createnewpassword', { setPasswords: setPasswords })
    }

    const handleEdit = (data) => {
        navigate('/editpassword', {
            state: {
                data: data,
                setPasswords: setPasswords
            }
        })
    }

    const handleDelete = (params) => {
        setOpenDialog(true)
        dialogTitle.current = password.delete.title
        dialogContent.current = password.delete.content
        dialogRightAction.current = () => handleConfirmDelete(params)
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
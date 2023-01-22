import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/AddCircle';
import { useState, useRef, useContext, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import CustomDialog from '../components/CustomDialog';
import { PASSWORD } from '../utils/Constants';
import { deletePassword } from '../apis/PasswordApi';
import { PasswordContext } from './ManagePassword';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import SportsEsports from '@mui/icons-material/SportsEsports';
import Work from '@mui/icons-material/Work';
import Person from '@mui/icons-material/Person';
import Others from '@mui/icons-material/Pending';

function PasswordTable(props) {
    const { passwords } = props;
    const [passwordsFiltered, setpasswordsFiltered] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')
    const dialogRightAction = useRef('')
    const { setPasswords } = useContext(PasswordContext);
    const navigate = useNavigate();

    useEffect(() => {
        setpasswordsFiltered(passwords)
    }, [passwords])

    const tableColumns = [
        {
            field: 'id',
            headerName: '#',
            // width: 40,
            flex: 0.5
        },
        {
            field: 'appName',
            headerName: 'Application',
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: 'loginId',
            headerName: 'Username',
            // width: 200,
            flex: 1,
            editable: false,
        },
        {
            field: 'password',
            headerName: 'Password',
            // width: 110,
            flex: 1,
            editable: false,
        },
        {
            field: 'category',
            headerName: 'Category',
            // width: 100,
            flex: 1,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            renderCell: ((params) => {
                return (
                    <ButtonGroup variant="text" aria-label="outlined primary button group" >
                        <React.Fragment>
                            <Tooltip title="Edit">
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
                            <Tooltip title="Delete">
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
                // setPasswords: setPasswords
            }
        })
    }

    const handleDelete = (params) => {
        setOpenDialog(true)
        dialogTitle.current = PASSWORD.DELETE.TITLE
        dialogContent.current = PASSWORD.DELETE.CONTENT
        dialogRightAction.current = () => handleConfirmDelete(params)
    }

    const handleConfirmDelete = (id) => {
        deletePassword(
            {
                payload: {
                    id: id
                }
            })
        setOpenDialog(false)
        console.log(`Delete password with id = ${id},`)
        window.location.reload(false)
    }

    const handleFilterPassword = (category) => {
        let newData = passwords
        if (category !== 'all') {
            newData = newData.filter(password => password.category === category)
        }

        setpasswordsFiltered(newData)
    }

    return (
        <React.Fragment>
            <Tooltip title="Add">
                <IconButton onClick={() => handleAdd()} color='primary'>
                    <Add />
                </IconButton>
            </Tooltip>
            <Tooltip title="Game">
                <IconButton onClick={() => handleFilterPassword('game')} color='primary'>
                    <SportsEsports />
                </IconButton>
            </Tooltip>
            <Tooltip title="Work">
                <IconButton onClick={() => handleFilterPassword('work')} color='primary'>
                    <Work />
                </IconButton>
            </Tooltip>
            <Tooltip title="Personal">
                <IconButton onClick={() => handleFilterPassword('personal')} color='primary'>
                    <Person />
                </IconButton>
            </Tooltip>
            <Tooltip title="Others">
                <IconButton onClick={() => handleFilterPassword('others')} color='primary'>
                    <Others />
                </IconButton>
            </Tooltip>
            <Tooltip title="Reset filter">
                <Button onClick={() => handleFilterPassword('all')} color='primary'>
                    Reset
                </Button>
            </Tooltip>
            <DataGrid
                rows={passwordsFiltered}
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
        </React.Fragment>
    );
}

export default PasswordTable;
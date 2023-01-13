import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/AddCircle';
import { useState, useRef } from 'react';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import CustomDialog from '../components/CustomDialog';

// const CustomToolbar = () => {
//     const apiRef = useGridApiContext();

//     const handleGoToPage1 = () => apiRef.current.setPage(1);

//     return (
//         <GridToolbarContainer>
//             <Button onClick={handleGoToPage1}>Go to page 1</Button>
//         </GridToolbarContainer>
//     );
// };

function PasswordTable() {

    // const [isEditable, setIsEditable] = useState(false)
    // const apiRef = useGridApiContext();
    const [openDialog, setOpenDialog] = useState(false)
    const dialogTitle = useRef('')
    const dialogContent = useRef('')

    const handleEdit = () => {
        // setIsEditable(true)
        setOpenDialog(true)
        dialogTitle.current = 'Editing title'
        dialogContent.current = 'Editing content'
    }

    const handleDelete = () => {

    }

    const handleConfirmEdit = () => {
        // call api to update password
        // setIsEditable(false)
    }

    const handleCancelEdit = () => {
        // setIsEditable(false)
    }

    const columns = [
        {
            field: 'id',
            headerName: '#',
            width: 40
        },
        {
            field: 'application',
            headerName: 'Application',
            width: 150,
            editable: false,
        },
        {
            field: 'username',
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
            renderCell: (() => {
                return (
                    <ButtonGroup variant="text" aria-label="outlined primary button group" >
                        {/* {isEditable ?
                            <React.Fragment>
                                <Tooltip title="Confirm">
                                    <Button onClick={() => handleConfirmEdit()}>
                                        <Check />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Cancel">
                                    <Button onClick={() => handleCancelEdit()}>
                                        <Clear />
                                    </Button>
                                </Tooltip>
                            </React.Fragment>
                            : */}
                        <React.Fragment>
                            <Tooltip title="Edit password">
                                <Button onClick={() => handleEdit()}>
                                    {/* <Button onClick={(params) => apiRef.current.startRowEditMode(params.row.id)}> */}
                                    <Edit />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Delete password">
                                <Button onClick={() => handleDelete()}>
                                    <Delete />
                                </Button>
                            </Tooltip>
                        </React.Fragment>
                        {/* } */}
                    </ButtonGroup >
                )
            })
        },
    ];

    const rows = [
        { id: 1, application: 'gitlab', username: 'jackyyip@asl.com.hk', password: '123456', category: 'Work' },
        { id: 2, application: 'tims', username: 'kccendorser1', password: '654321', category: 'Work' },
        { id: 3, application: 'ig', username: 'jackyyip@yahoo.com.hk', password: '654321', category: 'Personal' },
    ];


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Button onClick={() => handleEdit()} variant="text">
                <Add />
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                editMode="row"
                experimentalFeatures={{ newEditingApi: true }}
            />
            <CustomDialog
                open={openDialog}
                setOpen={setOpenDialog}
                title={dialogTitle.current}
                content={dialogContent.current}
            />
        </Box>
    );
}

export default PasswordTable;
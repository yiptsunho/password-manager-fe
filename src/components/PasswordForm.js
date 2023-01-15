import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef } from 'react';
import { TextField, MenuItem } from '@mui/material';

function PasswordForm(props) {
    const { data, handleSubmit } = props;
    const refForm = useRef(null);

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

    const handleClickSubmit = () => {
        const form = refForm.current
        alert(`${form['appName'].value} ${form['loginId'].value} ${form['password'].value} ${form['category'].value}`)
        handleSubmit(form)
    }

    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
        >
            <form ref={refForm}>
                <TextField
                    required
                    id="appName"
                    label="Application"
                    value={data ? data.appName : ''}
                />
                <TextField
                    required
                    id="loginId"
                    label="Username"
                    value={data ? data.loginId : ''}
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    value={data ? data.password : ''}
                />
                <TextField
                    id="category"
                    select
                    required
                    label="Category"
                    name='category'
                    value={data ? data.category : ''}
                >
                    {categoryList.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                            {category.label}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
            <Button onClick={handleClickSubmit}>Submit</Button>
        </Box>
        // <Box
        //     component="form"
        //     sx={{
        //         '& .MuiTextField-root': { m: 1, width: '25ch' },
        //     }}
        //     noValidate
        //     autoComplete="off"
        //     textAlign='center'
        // >
        //     <TextField
        //         required
        //         id="appName"
        //         label="Application"
        //         onChange={(e) => handleChange(passwordProfile, e.target.id, e.target.value)}
        //     />
        //     <TextField
        //         required
        //         id="loginId"
        //         label="Username"
        //         onChange={(e) => handleChange(passwordProfile, e.target.id, e.target.value)}
        //     />
        //     <TextField
        //         required
        //         id="password"
        //         label="Password"
        //         type="password"
        //         onChange={(e) => handleChange(passwordProfile, e.target.id, e.target.value)}
        //     />
        //     <TextField
        //         id="category"
        //         select
        //         required
        //         label="Category"
        //         name='category'
        //         onChange={(e) => handleChange(passwordProfile, e.target.name, e.target.value)}
        //     >
        //         {categoryList.map((category) => (
        //             <MenuItem key={category.value} value={category.value}>
        //                 {category.label}
        //             </MenuItem>
        //         ))}
        //     </TextField>
        // </Box>
    )
}

export default PasswordForm;

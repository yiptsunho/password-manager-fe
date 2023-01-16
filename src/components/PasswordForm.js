import { Button, Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useRef } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';

function PasswordForm(props) {
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);

    // console.log(watch("example")); // watch input value by passing the name of it
    const [textValue, setTextValue] = useState('');

    const handleChange = (e) => {
        setTextValue(e.target.value);
    }

    const handleSubmit = () => {
        console.log(textValue);
    }

    const handleReset = () => {
        setTextValue('');
    }

    return (
        <Paper>
            <h2>Form Demo</h2>

            <Grid>
                <TextField
                    required
                    onChange={handleChange}
                    label="Text Value"
                    value={textValue}
                />
            </Grid>
            <Grid>
                <Button onclick={handleSubmit}>Submit</Button>
            </Grid>
            <Grid>
                <Button onclick={handleReset}>Reset</Button>
            </Grid>
        </Paper>
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     {/* register your input into the hook by invoking the "register" function */}
        //     <input defaultValue="test" {...register("example")} />

        //     {/* include validation with required or other standard HTML validation rules */}
        //     <input {...register("exampleRequired", { required: true })} />
        //     {/* errors will return when field validation fails  */}
        //     {errors.exampleRequired && <span>This field is required</span>}

        //     <input type="submit" />
        // </form>
    )
    // const { data, handleSubmit } = props;
    // const formData = useRef(data ?? {
    //     appName: '',
    //     loginId: '',
    //     password: '',
    //     category: ''
    // })
    // const refForm = useRef(null);

    // // TODO: fetch using api
    // const categoryList = [
    //     {
    //         value: 'work',
    //         label: 'Work'
    //     },
    //     {
    //         value: 'game',
    //         label: 'Game'
    //     },
    //     {
    //         value: 'personal',
    //         label: 'Personal'
    //     },
    //     {
    //         value: 'others',
    //         label: 'Others'
    //     },
    // ]

    // const handleChange = (field, newValue) => {
    //     formData[field] = newValue
    // }

    // const handleClickSubmit = () => {
    //     const form = refForm.current
    //     alert(`${form['appName'].value} ${form['loginId'].value} ${form['password'].value} ${form['category'].value}`)
    //     handleSubmit(form)
    // }

    // return (
    //     <Box
    //         sx={{
    //             '& .MuiTextField-root': { m: 1, width: '25ch' },
    //         }}
    //     >
    //         <form ref={refForm} onChange={(e) => handleChange(e.target.id, e.target.value)}>
    //             <TextField
    //                 required
    //                 id="appName"
    //                 label="Application"
    //                 value={formData.appName}
    //             />
    //             <TextField
    //                 required
    //                 id="loginId"
    //                 label="Username"
    //                 value={formData.loginId}
    //             />
    //             <TextField
    //                 required
    //                 id="password"
    //                 label="Password"
    //                 type="password"
    //                 value={formData.password}
    //             />
    //             <TextField
    //                 id="category"
    //                 select
    //                 required
    //                 label="Category"
    //                 name='category'
    //                 value={formData.category}
    //             >
    //                 {categoryList.map((category) => (
    //                     <MenuItem key={category.value} value={category.value}>
    //                         {category.label}
    //                     </MenuItem>
    //                 ))}
    //             </TextField>
    //         </form>
    //         <Button onClick={handleClickSubmit}>Submit</Button>
    //     </Box>
    // )
}

export default PasswordForm;

import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useRef } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as _ from 'lodash';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordForm(props) {
    const { data, handleSubmit, formTitle } = props;
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
        {
            value: 'others',
            label: 'Others'
        },
    ]

    const [form, setForm] = useState(data ?? {
        appName: '',
        loginId: '',
        password: '',
        category: ''
    });
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (fieldName, value) => {
        let newData = _.cloneDeep(form)
        newData[fieldName] = value
        setForm(newData);
    }

    const handleReset = () => {
        setForm({
            appName: '',
            loginId: '',
            password: '',
            category: ''
        });
        setShowPassword(false)
    }

    const handleClickVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Grid container rowSpacing={3}>
                <h3>{formTitle ?? ''}</h3>
                <Grid container rowSpacing={2}>
                    <Grid container item md={12} alignItems='center'>
                        <Grid item md={4}>
                            <Typography>
                                Name of application / website:
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                fullWidth
                                required
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                name="appName"
                                value={form.appName}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item md={12} alignItems='center'>
                        <Grid item md={4}>
                            <Typography>
                                Username:
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                fullWidth
                                required
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                name="loginId"
                                value={form.loginId}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item md={12} alignItems='center'>
                        <Grid item md={4}>
                            <Typography>
                                Password:
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                fullWidth
                                required
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                name="password"
                                helperText="Scroll down to use our custom password generator"
                                value={form.password}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item md={12} alignItems='center'>
                        <Grid item md={4}>
                            <Typography>
                                Category:
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                fullWidth
                                required
                                select
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                name="category"
                                value={form.category}
                            >
                                {categoryList.map((category) => (
                                    <MenuItem key={category.value} value={category.value}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item rowSpacing={1} columnSpacing={2} justifyContent='end'>
                    <Grid item md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleReset}>Reset</Button>
                    </Grid>
                    <Grid item md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => handleSubmit(form)}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
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
}

export default PasswordForm;

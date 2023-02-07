import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, TextField, MenuItem, Box } from '@mui/material';
import * as _ from 'lodash';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate, useNavigate } from 'react-router-dom';

function UserForm(props) {
    const { data, handleSubmit, formTitle } = props;
    const [form, setForm] = useState(data ?? {
        loginId: '',
        password: '',
        displayName: ''
    });
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (fieldName, value) => {
        let newData = _.cloneDeep(form)
        newData[fieldName] = value
        setForm(newData);
    }

    const handleReset = () => {
        setForm({
            loginId: '',
            password: '',
            displayName: ''
        });
        setShowPassword(false)
    }

    const handleClickVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleBack = () => {
        navigate("/")
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
                                LoginId:
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                fullWidth
                                required
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                name="loginId"
                                value={form.loginId}
                                helperText={data ?? "Please use a valid email address as your loginId"}
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
                                helperText={data ?? "Scroll down to use our custom password generator"}
                                value={form.password}
                            // InputProps={{
                            //     endAdornment:
                            //         <InputAdornment position="end" >
                            //             <IconButton
                            //                 aria-label="toggle password visibility"
                            //                 onClick={handleClickVisibility}
                            //                 edge="end"
                            //             >
                            //                 {showPassword ? <VisibilityOff /> : <Visibility />}
                            //             </IconButton>
                            //         </InputAdornment>
                            // }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item md={12} alignItems='center'>
                        <Grid item md={4}>
                            <Typography>
                                Display Name:
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                fullWidth
                                required
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                name="displayName"
                                value={form.displayName}
                                helperText={data ?? "This will be shown as your username"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item rowSpacing={1} columnSpacing={2} justifyContent='end'>
                    <Grid item md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Grid>
                    <Grid item md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => handleSubmit(form)}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    )
}

export default UserForm;

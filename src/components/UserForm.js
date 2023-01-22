import React, { useState } from 'react';
import { Box, Grid, Typography, TextField } from '@mui/system';

function UserForm() {
    const { data, handleSubmit, formTitle } = props;
    const [form, setForm] = useState(data ?? {
        loginId: '',
        password: '',
        displayName: ''
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
                                helperText="This will be shown as your username"
                            />
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
    )
}

export default UserForm;

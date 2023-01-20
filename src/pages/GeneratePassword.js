import React from 'react';
import { Box } from '@mui/system';
import { FormGroup, FormControlLabel, Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ContentCopy from '@mui/icons-material/ContentCopy';

function GeneratePassword() {
    return (
        <Grid container rowSpacing={2}>
            <Grid container item alignItems='center'>
                <Checkbox defaultChecked />Uppercase letters
            </Grid>
            <Grid container item alignItems='center'>
                <Checkbox defaultChecked />Lowercase letters
            </Grid>
            <Grid container item alignItems='center'>
                <Checkbox defaultChecked />Numbers
            </Grid>
            <Grid container item alignItems='center'>
                <Checkbox defaultChecked />Symbols
            </Grid>
            <Grid container item alignItems='center'>
                <Checkbox defaultChecked />Strict
            </Grid>
            <Grid container item alignItems='center'>
                <TextField
                    label='Exclude'
                    id='exclude'
                    value={null}
                />
            </Grid>
            <Grid container item alignItems='center'>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Generate
                </Button>
            </Grid>
            <Grid container item>
                <TextField
                    fullWidth
                    id='exclude'
                    value={null}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end" >
                                <IconButton
                                    aria-label="copy"
                                    edge="end"
                                >
                                    <ContentCopy />
                                </IconButton>
                            </InputAdornment>
                    }}
                />
            </Grid>
        </Grid >
    )
}

export default GeneratePassword;
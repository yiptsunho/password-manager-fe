import React from 'react';
import { Button, Grid } from '@mui/material';

function CustomButton(props) {
    const { fullWidth = false, onClick, description = "Custom Button", disabled = false } = props;

    return (
        <Grid item md={5}>
            <Button
                fullWidth={fullWidth}
                variant="contained"
                onClick={onClick}
                disabled={disabled}
                sx={{ mt: 3, mb: 2, textTransform: 'none', borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
            >
                {description}
            </Button>
        </Grid>
    )
}

export default CustomButton;
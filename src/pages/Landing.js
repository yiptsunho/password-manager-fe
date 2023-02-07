import { Button, Grid } from '@mui/material';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { CssBaseline } from '@mui/material';

function Landing(props) {
    const { handleClickRefresh } = props;

    return (
        <div className="App-header dark">
            <div className="container">
                <CssBaseline />
                <h1>This is the landing page</h1>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleClickRefresh}
                >
                    Refresh my token
                </Button>
                <Grid container spacing={2}>
                    <CustomButton
                        fullWidth={true}
                        onClick={() => console.log('button clicked')}
                        description={'Refresh my token'}
                    />
                    <CustomButton
                        onClick={() => console.log('button clicked')}
                        description={'Submit'}
                    />
                </Grid>
            </div>
        </div>
    )
}

export default Landing;
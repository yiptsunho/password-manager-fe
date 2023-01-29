import { Button } from '@mui/material';
import React from 'react';

function Landing(props) {
    const { handleClickRefresh } = props;

    return (
        <div className="App-header dark">
            <div className="container">
                <h1>This is the landing page</h1>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleClickRefresh}
                >
                    Refresh my token
                </Button>
            </div>
        </div>
    )
}

export default Landing;
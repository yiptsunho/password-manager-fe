import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function CustomDialog(props, ref) {
    const { open, setOpen, title, content, leftLabel, leftAction, rightLabel, rightAction } = props;

    const defaultHandleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={rightAction ?? defaultHandleClose}
            PaperProps={{
                style: {
                    borderRadius: 15,
                    padding: '5px 10px'
                }
            }}
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {leftLabel &&
                    <Button onClick={leftAction ?? defaultHandleClose}>{leftLabel ?? 'Cancel'}</Button>
                }
                <Button onClick={rightAction ?? defaultHandleClose}>{rightLabel ?? 'OK'}</Button>
            </DialogActions>
        </Dialog >
    );
}

export default CustomDialog;
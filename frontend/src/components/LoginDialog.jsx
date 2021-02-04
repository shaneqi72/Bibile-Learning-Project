import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const LoginDialog = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>Please input Email</DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="user-name"
                    label="User Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Sign In
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export { LoginDialog };

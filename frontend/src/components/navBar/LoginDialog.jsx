import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const LoginDialog = ({ open, handleClose }) => {
    const [inputUserName, setInputUserName] = useState(null);
    const [inputPassword, setInputpassword] = useState(null);

    const onChangeUserName = (e) => {
        setInputUserName(e.target.value);
    };
    const onChangePassword = (e) => {
        setInputpassword(e.target.value);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5500/auth/signin', {
                username: inputUserName,
                password: inputPassword,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        handleClose();
    };
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
                    value={inputUserName}
                    onChange={onChangeUserName}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={inputPassword}
                    onChange={onChangePassword}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSignIn} color="primary">
                    Sign In
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export { LoginDialog };

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const RegisterDialog = ({ open, handleClose }) => {
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUserName] = useState(null);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const onLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const axios = require('axios');

    const onSubmitSignUp = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5500/auth/signup', {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        handleClose();
    };

    return (
        <Dialog
            action="http://localhost:5500/auth/signup"
            method="POST"
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
                <form
                    autoComplete="off"
                    // action="http://localhost:5500/auth/signup"
                    // method="POST"
                    onSubmit={onSubmitSignUp}
                >
                    <TextField
                        name="firstName"
                        value={firstName}
                        autoFocus
                        margin="dense"
                        id="first-name"
                        label="First Name"
                        type="text"
                        fullWidth
                        onChange={onFirstNameChange}
                    />
                    <TextField
                        name="lastName"
                        value={lastName}
                        autoFocus
                        margin="dense"
                        id="last-name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        onChange={onLastNameChange}
                    />
                    <TextField
                        name="userName"
                        value={username}
                        autoFocus
                        margin="dense"
                        id="user-name"
                        label="User Name"
                        type="text"
                        fullWidth
                        onChange={onUserNameChange}
                    />
                    <TextField
                        name="email"
                        value={email}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        onChange={onEmailChange}
                    />
                    <TextField
                        name="password"
                        value={password}
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Create Password"
                        type="password"
                        fullWidth
                        onChange={onPasswordChange}
                    />
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Sign Up
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export { RegisterDialog };

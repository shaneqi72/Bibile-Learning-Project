import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormikField from './FormikField';

import * as yup from 'yup';
import { Formik, Form } from 'formik';

const RegisterDialog = ({ open, handleClose }) => {
    const initialValues = {
        fistname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        firstname: yup.string().required('Required!'),
        lastname: yup.string().required('Required!'),
        username: yup.string().required('Required!'),
        email: yup.string().email().required('Required!'),
        password: yup.string().required('Required!'),
    });

    const axios = require('axios');

    const onSubmitSignUp = (values) => {
        const { firstname, lastname, username, email, password } = values;

        axios
            .post('http://localhost:5500/auth/signup', {
                firstName: firstname,
                lastName: lastname,
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
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitSignUp}
                >
                    <Form>
                        <FormikField name="firstname" id="firstname" label="First Name" />
                        <FormikField name="lastname" id="lastname" label="Last Name" />
                        <FormikField name="username" id="username" label="User Name" />
                        <FormikField type="email" name="email" id="email" label="Email" />
                        <FormikField
                            type="password"
                            name="password"
                            id="password"
                            label="Create Password"
                        />
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Sign Up
                        </Button>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export { RegisterDialog };

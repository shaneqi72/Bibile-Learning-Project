import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import FormikField from './FormikField';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../store/auth/actions';

const LoginDialog = ({ open, handleClose }) => {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string().required('Required'),
    });

    const dispatch = useDispatch();

    const onSubmit = (values, onSubmitProps) => {
        axios
            .post(
                'http://localhost:5500/auth/signin',
                {
                    username: values.username,
                    password: values.password,
                },
                // {
                //     headers: {
                //         authorization: 'Bearer {token}',
                //     },
                // },
            )
            .then((res) => {
                dispatch(setUserInfo(res.data.token, true));
            })
            .catch((err) => console.log(err));
        onSubmitProps.setSubmitting(false);
        handleClose();
    };

    const isLoggedIn = useSelector((state) => state.auth);
    console.log(isLoggedIn);
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <Form>
                            <FormikField name="username" id="username" label="Username" />
                            <FormikField
                                name="password"
                                id="password"
                                label="Password"
                                type="password"
                            />
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={!formik.isValid || formik.isSubmitting}
                                >
                                    Sign In
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export { LoginDialog };

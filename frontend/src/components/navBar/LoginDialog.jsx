import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import FormikField from './FormikField';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/auth/actions';
import { setWithExpiry, setUserDetailFromLocalStorage } from './LocalStorage';

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
                dispatch(setUserInfo(res.data.accessToken, res.data.id, res.data.user));
                setWithExpiry('token', res.data.accessToken, 43200000);
                setUserDetailFromLocalStorage('accessAuthority', res.data.user, 43200000);
            })
            .catch((err) => console.log(err));
        onSubmitProps.setSubmitting(false);
        handleClose();
    };

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

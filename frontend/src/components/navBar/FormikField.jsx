import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
import TextError from './TextError';
const FormikField = ({ name, label, id, type = 'text' }) => {
    return (
        <>
            <Field
                autoComplete="off"
                autoFocus
                required
                name={name}
                type={type}
                id={id}
                label={label}
                fullWidth
                as={TextField}
                margin="dense"
            />
            <ErrorMessage name={name} component={TextError} />
        </>
    );
};

export default FormikField;

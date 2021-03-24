import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
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
            <ErrorMessage name={name} />
        </>
    );
};

export default FormikField;

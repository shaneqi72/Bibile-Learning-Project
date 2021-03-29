import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';

const FormikField = (props) => {
    const { type = 'text', error, ...rest } = props;

    return (
        <>
            <Field
                autoComplete="off"
                type={type}
                fullWidth
                as={TextField}
                margin="dense"
                helperText={error}
                error={Boolean(error)}
                {...rest}
            />
        </>
    );
};

export default FormikField;

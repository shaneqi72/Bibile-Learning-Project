import React from 'react';
import { makeStyles } from '@material-ui/core';

const Box = (props) => {
    const classes = useStyles(props);

    return <div className={classes.root}>{props.children}</div>;
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: ({ row }) => (row ? 'row' : 'column'),
        position: 'relative',
        boxSizing: 'border-box',
        flex: 1,
    },
}));

export { Box };

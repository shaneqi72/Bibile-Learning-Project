import React from 'react';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const PersonalDetailPage = () => {
    const firstName = useSelector((state) => state.auth.user?.firstName);
    const lastName = useSelector((state) => state.auth.user?.lastName);
    const username = useSelector((state) => state.auth.user?.username);
    const email = useSelector((state) => state.auth.user?.email);

    const titles = [
        {
            item: 'First Name',
            value: firstName,
        },
        {
            item: 'Last Name',
            value: lastName,
        },
        {
            item: 'Username',
            value: username,
        },
        {
            item: 'Email',
            value: email,
        },
    ];
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={3}>
                {titles.map((title, index) => {
                    return (
                        <Grid key={index} item xs={12}>
                            <Paper elevation={0}>
                                <div className={classes.list}>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {title.item} :
                                    </Typography>
                                    <Typography>{title.value}</Typography>
                                </div>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

const useStyles = makeStyles({
    container: {
        marginTop: '30px',
    },
    list: {
        borderBottom: '1px solid black',
    },
});

export default PersonalDetailPage;

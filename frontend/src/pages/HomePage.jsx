import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '../components/box/Box';
import peace1 from '../images/peace1.jpg';
import peace2 from '../images/peace2.jpg';
import peace3 from '../images/peace3.jpg';
import peace4 from '../images/peace4.jpg';

const HomePage = () => {
    const classes = useStyles();

    return (
        <Box>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <img src={peace1} alt="peace" className={classes.img} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paperTypo}>
                        <Typography color="initial">
                            "Therefore do not worry about tomorrow, for tomorrow will worry about
                            itself. Each day has enough trouble of its own."" (Matthew 6:34)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row-reverse"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <img src={peace2} alt="peace" className={classes.img} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paperTypo}>
                        <Typography color="initial">
                            “Come to me, all you who are weary and burdened, and I will give you
                            rest. Take my yoke upon you and learn from me, for I am gentle and
                            humble in heart, and you will find rest for your souls. For my yoke is
                            easy and my burden is light.” (Matthew 11: 28-30)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <img src={peace3} alt="peace" className={classes.img} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paperTypo}>
                        <Typography color="initial">
                            "For I am convinced that neither death nor life, neither angels nor
                            demons, neither the present nor the future, nor any powers, neither
                            height nor depth, nor anything else in all creation, will be able to
                            separate us from the love of God that is in Christ Jesus our Lord."
                            (Romans 8: 38-39)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row-reverse"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <img src={peace4} alt="peace" className={classes.img} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paperTypo}>
                        <Typography color="initial">
                            “The LORD is my shepherd, I lack nothing. He makes me lie down in green
                            pastures, he leads me beside quiet waters, he refreshes my soul. He
                            guides me along the right paths for his name’s sake. Even though I walk
                            through the darkest valley,I will fear no evil, for you are with me;
                            your rod and your staff, they comfort me. You prepare a table before me
                            in the presence of my enemies. You anoint my head with oil; my cup
                            overflows. Surely your goodness and love will follow me all the days of
                            my life, and I will dwell in the house of the LORD forever.” (Psalm 23)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        height: 200,
        margin: '15px',
    },
    paperTypo: {
        width: 'auto',
        height: 200,
        margin: '15px',
    },
    img: {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
        borderRadius: '3px',
    },
}));

export default HomePage;

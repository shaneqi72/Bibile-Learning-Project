import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UpdateIcon from '@material-ui/icons/Update';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import TimerIcon from '@material-ui/icons/Timer';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import SubjectIcon from '@material-ui/icons/Subject';
import { useHistory } from 'react-router-dom';

const LearningMobilePage = () => {
    const history = useHistory();

    const handleBibleQuiz = () => {
        history.push('/learning/test');
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.gird}>
                    <h3>Bible Learning</h3>
                </Grid>
                <Grid item xs={6} className={classes.gird}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<TimerIcon />}
                        onClick={handleBibleQuiz}
                    >
                        Quiz
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.gird}>
                    <Button
                        onClick={() => history.push('/bible-reading')}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<MenuBookIcon />}
                    >
                        Read Bible
                    </Button>
                </Grid>

                <Grid item xs={6} className={classes.gird}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<BookmarksIcon />}
                    >
                        My Verses
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.gird}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<UpdateIcon />}
                    >
                        Learning History
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.gird}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SubjectIcon />}
                    >
                        Scores
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.gird}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ExitToAppIcon />}
                        onClick={() => history.push('/')}
                    >
                        Exit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        marginTop: '1.5rem',
        width: '80%',
    },
    gird: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default LearningMobilePage;

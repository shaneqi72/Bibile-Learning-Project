import React from 'react';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import QuizPage from './pages/QuizPage';
import { Toolbar, ThemeProvider } from '@material-ui/core';
import { NavBar } from './components/NavBar';
import { Box } from './components';
import { theme } from './theme';
import { NavDrawer } from './components/drawer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Hidden } from '@material-ui/core';

function App() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavBar />
                <Toolbar />
                <NavDrawer />
                <div className={classes.container}>
                    <Hidden xsDown>
                        <div className={classes.drawerSpacer} />
                    </Hidden>
                    <Box>
                        <Switch>
                            <Route exact path="/">
                                <HomePage />
                            </Route>
                            <Route exact path="/learning">
                                <LearningPage />
                            </Route>
                            <Route path="/learning/test">
                                <QuizPage />
                            </Route>
                        </Switch>
                    </Box>
                </div>
            </Router>
        </ThemeProvider>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width: '100vw',
    },
    drawerSpacer: {
        width: 190,
    },
});

export default App;

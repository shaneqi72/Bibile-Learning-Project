import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import QuizPage from './pages/QuizPage';
import BibleReadingPage from './pages/BibleReadingPage';
import { Toolbar, ThemeProvider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavBar } from './components/navBar/NavBar';
import { Box } from './components/box/Box';
import { theme } from './theme';
import { NavDrawer } from './components/drawer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Hidden } from '@material-ui/core';
import PersonalDetailPage from './pages/PersonalDetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { getWithExpiry } from '../../frontend/src/components/navBar/LocalStorage';
import axios from 'axios';
import { setUserInfo } from './store/auth/actions';

function App() {
    const classes = useStyles();
    const accessToken = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const localStorageToken = getWithExpiry('token');

        axios
            .get('http://localhost:5500/auth/api/user-profile', {
                headers: {
                    Authorization: `bearer ${localStorageToken}`,
                },
            })
            .then((res) => {
                dispatch(setUserInfo(localStorageToken, res.data.user.id, res.data.user));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

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
                                {accessToken.token && <LearningPage />}
                            </Route>
                            <Route path="/learning/test">{accessToken.token && <QuizPage />}</Route>
                            <Route path="/personal-detail">
                                {accessToken.token && <PersonalDetailPage />}
                            </Route>
                            <Route path="/bible-reading">
                                {accessToken.token && <BibleReadingPage />}
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

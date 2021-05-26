import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    makeStyles,
    Toolbar,
    Hidden,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { getWithExpiry } from '../navBar/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavDrawer } from '../../store/nav/actions';

const DRAWER_WIDTH = 180;

const NavDrawer = () => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const localStorageToken = getWithExpiry('token');
    const accessToken = useSelector((state) => state.auth);
    const drawerOpen = useSelector((state) => state.nav.drawerOpen);
    const dispatch = useDispatch();

    const fetchUserDetail = () => {
        history.push('/personal-detail');
        dispatch(toggleNavDrawer());
    };

    const loggedInDrawer = [
        {
            text: 'User Details',
            icon: <InboxIcon />,
            onClick: fetchUserDetail,
            path: '/personal-detail',
        },
        {
            text: '记忆金句',
            icon: <InboxIcon />,
            onClick: () => {
                (accessToken.token || localStorageToken) && history.push('/learning');
                dispatch(toggleNavDrawer());
            },
            path: '/learning',
        },
        {
            text: '金句游戏',
            icon: <InboxIcon />,
            onClick: () => {
                (accessToken.token || localStorageToken) && history.push('/learning/test');
                dispatch(toggleNavDrawer());
            },
            path: '/learning/test',
        },

        {
            text: '使用说明',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
            path: '',
        },
        {
            text: '常见问题',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
            path: '',
        },

        {
            text: '告诉朋友',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
            path: '',
        },
    ];

    const drawerItems = [
        {
            text: 'About us',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: 'Share to friends',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
    ];

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <>
            <Hidden xsDown>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open
                >
                    <Toolbar />
                    {accessToken.token || localStorageToken ? (
                        <List>
                            {loggedInDrawer.map((item, index) => {
                                const { text, icon, onClick, path } = item;
                                return (
                                    <ListItem
                                        button
                                        key={index}
                                        onClick={onClick}
                                        className={
                                            location.pathname === path ? classes.active : null
                                        }
                                    >
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <List>
                            {drawerItems.map((item, index) => {
                                const { text, icon, onClick } = item;
                                return (
                                    <ListItem button key={index} onClick={onClick}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </Drawer>
            </Hidden>

            <Hidden smUp>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={drawerOpen}
                    onClose={() => dispatch(toggleNavDrawer())}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    {accessToken.token || localStorageToken ? (
                        <List>
                            {loggedInDrawer.map((item, index) => {
                                const { text, icon, onClick } = item;
                                return (
                                    <ListItem button key={text} onClick={onClick}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <List>
                            {drawerItems.map((item, index) => {
                                const { text, icon, onClick } = item;
                                return (
                                    <ListItem button key={text} onClick={onClick}>
                                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                        <ListItemText primary={text} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </Drawer>
            </Hidden>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    active: {
        background: '#DCDCDC',
    },
}));

export { NavDrawer };

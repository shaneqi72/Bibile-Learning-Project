import React from 'react';
import { useHistory } from 'react-router-dom';
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
    const classes = useStyles();
    const localStorageToken = getWithExpiry('token');
    const accessToken = useSelector((state) => state.auth);
    const drawerOpen = useSelector((state) => state.nav.drawerOpen);
    const dispatch = useDispatch();

    const loggedInDrawer = [
        {
            text: '个人信息',
            icon: <InboxIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '记忆金句',
            icon: <InboxIcon />,
            onClick: () => {
                history.push('/learning');
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '我的金句',
            icon: <InboxIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '金句管理',
            icon: <InboxIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },

        {
            text: '使用说明',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '常见问题',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '记忆妙法',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '告诉朋友',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
    ];

    const drawerItems = [
        {
            text: '使用说明',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '常见问题',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '记忆妙法',
            icon: <MailIcon />,
            onClick: () => {
                dispatch(toggleNavDrawer());
            },
        },
        {
            text: '告诉朋友',
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
                                const { text, icon, onClick } = item;
                                return (
                                    <ListItem button key={index} onClick={onClick}>
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
}));

export { NavDrawer };

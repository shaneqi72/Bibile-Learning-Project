import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../store/auth/actions';
import { LoginDialog } from './LoginDialog';
import { RegisterDialog } from './RegisterDialog';
import { getWithExpiry } from './LocalStorage';
import { toggleNavDrawer } from '../../store/nav/actions';
import { useHistory } from 'react-router-dom';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const NavBar = () => {
    const history = useHistory();
    //Menu buttons in NavBar
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    //Login Button

    const [openSignIn, setOpenSignIn] = useState(false);

    const handleSignInOpen = () => {
        setOpenSignIn(!openSignIn);
        handleMenuClose();
    };

    const handleSignInClose = () => {
        setOpenSignIn(false);
    };
    //Sign Up
    const [openSignUp, setOpenSignUp] = useState(false);

    const handleSignUpOpen = () => {
        setOpenSignUp(!openSignUp);
        handleMenuClose();
    };

    const handleSignUpClose = () => {
        setOpenSignUp(false);
    };
    const handleLogoutButton = () => {
        dispatch(setUserInfo(null));
        localStorage.removeItem('token');
        history.push('/');
    };

    const handleBibleReadingButton = () => {
        history.push('/bible-reading');
        handleMenuClose();
    };

    const accessToken = useSelector((state) => state.auth);
    const localStorageToken = getWithExpiry('token');
    const dispatch = useDispatch();

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <Hidden smUp>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => dispatch(toggleNavDrawer())}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography
                    className={classes.title}
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    BIBLE LEARNING
                </Typography>

                <Hidden xsDown>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleMenuClick}
                    >
                        More Info
                    </Button>

                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Gold Verses" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleBibleReadingButton}>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Reading Bible" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Search Scriptures" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Quiz" />
                        </StyledMenuItem>
                    </StyledMenu>

                    {accessToken.token ? (
                        <Button
                            variant="outlined"
                            style={{ color: 'white' }}
                            onClick={handleLogoutButton}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            style={{ color: 'white' }}
                            onClick={handleSignInOpen}
                        >
                            Login
                        </Button>
                    )}
                </Hidden>

                <Hidden smUp>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleMenuClick}
                    >
                        More Info
                    </Button>
                    {accessToken.token || localStorageToken ? (
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            onClick={handleLogoutButton}
                        >
                            Log out
                        </Button>
                    ) : null}

                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {accessToken.token || localStorageToken ? (
                            <StyledMenuItem onClick={handleLogoutButton}>
                                <ListItemIcon>
                                    <VpnKeyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Log out" />
                            </StyledMenuItem>
                        ) : (
                            <StyledMenuItem onClick={handleSignInOpen}>
                                <ListItemIcon>
                                    <VpnKeyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Log in" />
                            </StyledMenuItem>
                        )}
                        {accessToken.token || localStorageToken ? null : (
                            <StyledMenuItem onClick={handleSignUpOpen}>
                                <ListItemIcon>
                                    <VpnKeyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Sign up" />
                            </StyledMenuItem>
                        )}

                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Gold verses" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleBibleReadingButton}>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Read bible" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Search scriptures" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Quiz" />
                        </StyledMenuItem>
                    </StyledMenu>
                </Hidden>
            </Toolbar>
            <LoginDialog open={openSignIn} handleClose={handleSignInClose} />
            <RegisterDialog open={openSignUp} handleClose={handleSignUpClose} />
        </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 1300,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer',
    },
}));

export { NavBar };

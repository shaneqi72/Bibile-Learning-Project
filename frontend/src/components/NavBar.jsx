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
import { useDispatch } from 'react-redux';

import { LoginDialog } from './LoginDialog';

import { toggleNavDrawer } from '../store/nav/actions';

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

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
        handleMenuClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <Typography className={classes.title}>
                    <a href="/" className={classes.webName}>
                        圣经金句网
                    </a>
                </Typography>

                <Hidden xsDown>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleMenuClick}
                    >
                        圣经研习
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
                            <ListItemText primary="圣经金句" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="阅读圣经" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="搜索圣经" />
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="金句测试" />
                        </StyledMenuItem>
                    </StyledMenu>
                    <Button variant="outlined" style={{ color: 'white' }} onClick={handleClickOpen}>
                        Login
                    </Button>
                </Hidden>

                <Hidden smUp>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleMenuClick}
                    >
                        更多内容
                    </Button>

                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <StyledMenuItem onClick={handleClickOpen}>
                            <ListItemIcon>
                                <VpnKeyIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="用户登录" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="圣经金句" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="阅读圣经" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="搜索圣经" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <InboxIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="金句测试" />
                        </StyledMenuItem>
                    </StyledMenu>
                </Hidden>
            </Toolbar>
            <LoginDialog open={open} handleClose={handleClose} />
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
    },
    webName: {
        textDecoration: 'none',
        color: 'white',
    },
}));

export { NavBar };

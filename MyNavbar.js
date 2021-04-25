import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { React, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({

    wholeBody: {
        textAlign: "center"
    },
    root: {
        flexGrow: 2,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontSize: "75px",
        color: "#FFF",
        backgroundColor: "#1a3201"
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    list: {
        width: 250,
    },
}));

export default function MyNavbar(props) {

    const { filterOnChange, addItemFunc } = props
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }

        setDrawerState(open)
    }

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List >
                <Link to="/" exact style={{ textDecoration: "none" }}>
                    <ListItem button>
                        <ListItemIcon >
                            <HomeIcon></HomeIcon>
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                </Link>
                <Link to="/liked" exact style={{ textDecoration: "none" }}>
                    <ListItem button>
                        <ListItemIcon >
                            <FavoriteIcon></FavoriteIcon>
                        </ListItemIcon>
                        <ListItemText primary={"Liked"} />
                    </ListItem>
                </Link>
            </List>
        </div>
    )
    return (
        <div>
            <div style={{ backgroundColor: "#1a3201" }}>
                <div className={classes.grow}>
                    <AppBar position="static" style={{ backgroundColor: "#1a3201" }}>
                        <Toolbar>
                            <div>
                                <IconButton onClick={toggleDrawer(true)}>
                                    <MenuIcon style={{ color: "#00cb75" }}></MenuIcon>
                                </IconButton>
                                <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
                                    {list()}
                                </Drawer>
                            </div>
                            {/********************Search Field *******************************/}

                            <div className={classes.grow} />
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={filterOnChange}
                                />
                            </div>

                            {/********************Search Field *******************************/}

                            <Link to="/addItem">
                                <IconButton onClick={addItemFunc}>
                                    <AddBoxIcon style={{ color: "#00cb75" }} />
                                </IconButton>

                            </Link>


                        </Toolbar>
                    </AppBar>
                </div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>RECIPE HUB</Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

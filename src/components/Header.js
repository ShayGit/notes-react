import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  fade,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SearchIcon from "@material-ui/icons/Search";
import { initNotes } from "../Slices/notesSlice";
import { signout } from "../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const classes = useStyles();

  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    event.preventDefault();
    const phrase = event.target.value
    setSearchValue(phrase);
    phrase? history.push(`?search=${event.target.value.toLowerCase()}`) : history.push("");
    
  };

  const signoutHandler = () => {
    history.push("");
    setSearchValue("");
    
    dispatch(initNotes())
    dispatch(signout());
  };

  useEffect(() => {
    history.push("");
  },[history])
  return (
    <AppBar position="static" >
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <ListAltIcon fontSize="large" />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            Notes
          </Typography>
        </Box>
        {userInfo ? (
          <>
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
                value={searchValue}
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => handleSearchChange(event)}
              />
            </div>

            <Box display="flex" alignItems="center" >
              <Typography className={classes.title} variant="h6" noWrap>
                Hello {userInfo.username}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={signoutHandler}
              >
                Sign out
              </Button>
            </Box>
          </>
        ) : (
          <Box display="flex">
            <Link className={classes.menuButton} to="/signin">
              <Button variant="contained" color="Primary">
                Signin
              </Button>
            </Link>

            <Link className={classes.menuButton} to="/signup">
              <Button variant="contained" color="secondary">
                Signup
              </Button>
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
    margin: "auto 3rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
  },

  title: {
    display: "none",
    marginRight: "2rem",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      margin: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "45vmin",
      "&:focus": {
        width: "50vmin",
      },
    },
  },
}));

import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector, useDispatch} from 'react-redux';

// material ui component
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Toolbar,
  Typography, Button, TextField } from '@material-ui/core';

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    searchContainer: {
      display: 'flex',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      borderRadius: '10px',
      padding:'10px',
      margin: '5px', 
    },
    searchIcon: {
      alignSelf: 'flex-end',
      marginBottom: '5px'
    }
  }));

function Nav() {
  // material ui
  const classes = useStyles();

  // grab the user from redux
  const user = useSelector((store) => store.user);
  // use dispatch
  const dispatch = useDispatch();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/mainPage';
    loginLinkData.text = 'Home';
  }

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Choking Plastic
        </Typography>

        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon}/>
          <TextField label='Search by genre'/>
        </div>

        {user.id && (
          <>

          <Button color='inherit'>
            <Link className="navLink" to={loginLinkData.path}>
            {loginLinkData.text}
          </Link>
          </Button>

          <Button color='inherit'>
            <Link className='navLink' to="/myLikes">
             My Liked Products
            </Link>
          </Button>

          <Button color='inherit'>
            <Link className="navLink" to="/myHates">
             My Hated Products
            </Link>
          </Button>

          <Button color='inherit'
            onClick={() => dispatch({ type: 'LOGOUT' })}>
            <span className="navLink">Log Out</span>
          </Button>

            {/* <LogOutButton className="navLink" /> */}
          </>
        )}

        {user.authority === 'ADMIN' && (
          <Button color='inherit'>
            <Link className="navLink" to="/addProduct">
              Add Product
            </Link>
          </Button>
        )}
        
      </Toolbar>
    </AppBar>
  </div>
    
    // <div className="nav">
    //   <Link to="/home">
    //     <h2 className="nav-title">Plastic Alt Tracker</h2>
    //   </Link>
    //   <div>
        // <Link className="navLink" to={loginLinkData.path}>
        //   {loginLinkData.text}
        // </Link>

        // {user.id && (
        //   <>
        //     <Link className="navLink" to="/myLikes">
        //      My Liked Products
        //     </Link>

        //     <Link className="navLink" to="/myHates">
        //      My Hated Products
        //     </Link>

        //     <LogOutButton className="navLink" />
        //   </>
        // )}

        // {user.authority === 'ADMIN' && (
        //   <Link className="navLink" to="/addProduct">
        //     Add Product
        //   </Link>
        // )}

    //   </div>
    // </div>
  );
}

export default Nav;

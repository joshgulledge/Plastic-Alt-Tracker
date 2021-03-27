import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import {useSelector, useDispatch} from 'react-redux';
import { AppBar, Toolbar,
  Typography, Button } from '@material-ui/core';

// material ui component
import { makeStyles } from '@material-ui/core/styles';

  // material ui styling object
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
  };

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Choking Plastic
        </Typography>

              {/* Nav Bar Options   */}
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
             My Disliked Products
            </Link>
          </Button>

          <Button color='inherit'
            onClick={() => dispatch({ type: 'LOGOUT' })}>
            <span className="navLink">Log Out</span>
          </Button>
          </>
        )}

      {/* Nav Bar Conditional option -only for admin */}
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
  );
}

export default Nav;

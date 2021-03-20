import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

// material ui component
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar,
  Typography, Button, IconButton } from '@material-ui/core';

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

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/mainPage';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Plastic Alt Tracker</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/myLikes">
             My Liked Products
            </Link>

            <Link className="navLink" to="/myHates">
             My Hated Products
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {user.authority === 'ADMIN' && (
          <Link className="navLink" to="/addProduct">
            Add Product
          </Link>
        )}

      </div>
    </div>
  );
}

export default Nav;

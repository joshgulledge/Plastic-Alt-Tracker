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

         {/* This is the search drop down select 
       {user.id && 
       ( <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon}/>
          <FormControl
          className={classes.formControl}>
            <Select
              value={searchCategory}
              onChange={handleSearch}
              displayEmpty
              // className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}>

              <MenuItem value="" disabled>
                Pick a Genre
              </MenuItem>
              <MenuItem value={'all'}>All Products</MenuItem>
              <MenuItem value={'utensils'}>Kitchen Utensils</MenuItem>
              <MenuItem value={'garbage bags'}>Garbage Bags</MenuItem>
              <MenuItem value={'bottles'}>Water Bottles</MenuItem>
              <MenuItem value={'personal'}>Personal Items</MenuItem>
              <MenuItem value={'wraps'}>Food Wraps/SandwichBags</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        )} */}

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
             My Hated Products
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

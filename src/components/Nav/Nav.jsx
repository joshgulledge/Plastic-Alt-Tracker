import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import {useSelector, useDispatch} from 'react-redux';

// material ui component
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Toolbar,
  Typography, Button, TextField,
  MenuItem, FormControl, Select } from '@material-ui/core';

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
      borderRadius: '10px',
      padding:'10px',
      margin: '5px', 
    },
    searchIcon: {
      alignSelf: 'flex-end',
      marginBottom: '10px'
    },
    
  }));

function Nav() {
  // material ui
  const classes = useStyles();

  // grab the user from redux
  const user = useSelector((store) => store.user);
  // use dispatch
  const dispatch = useDispatch();

  // local state for the search bar
  const [searchCategory, setSearchCategory] = useState('');

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/mainPage';
    loginLinkData.text = 'Home';
  };

  const handleSearch = function (event) {
    setSearchCategory(event.target.value);
    console.log(searchCategory);
  }; // end handleSearch

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          Choking Plastic
        </Typography>

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
        )}

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

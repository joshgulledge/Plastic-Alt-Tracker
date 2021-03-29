import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// components
import SingleProduct from '../SingleProduct/SingleProduct';

// material ui components
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar,Grid, Toolbar,
  Typography, Button, TextField, CircularProgress,
  MenuItem, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    width: '90%',
    margin: '1px',
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
  searchButton: {
    marginLeft: theme.spacing(1)
  }
}));

function MainPage() {
   // material ui
   const classes = useStyles();
  
  const dispatch = useDispatch();

  // local state
  const [searchCategory, setSearchCategory] = useState('');
  const [displayArray, setDisplayArray] = useState([]);
  // states from redux
  const user = useSelector(store => store.user);
  const productList = useSelector(store => store.products.productList);
  
  // when productList changes do this. Should only change once.
  useEffect(() => {
    setDisplayArray(productList);
  }, [productList]);

  const handleSearch = function (event) {
    // change the product list we loop through depending on search category 
    // use this array to temp store matches
    let matches = [];
    // use case for williams favorite switch case
    switch (searchCategory) {
      case '':
        matches = productList
        break;
      case 'all':
        matches = productList
        break;
      case 'utensils':
        // loop through product list
         matches = productList.filter(product => product.category === 'utensils' ); // end the loop
        break;
      case 'garbage bags':
        // loop through product list
        matches = productList.filter(product => product.category === 'garbage bags' ); // end the loop
        break;
      case 'bottles':
        // loop through product list
        matches = productList.filter(product => product.category === 'bottles' ); // end the loop
        break;
      case 'personal':
        // loop through product list
        matches = productList.filter(product => product.category === 'personal' ); // end the loop
        break;
      case 'soaps':
        // loop through product list
        matches = productList.filter(product => product.category === 'soaps' ); // end the loop
        break;
      case 'wraps':
        // loop through product list
        matches = productList.filter(product => product.category === 'wraps' ); // end the loop
        break;
      case 'other':
        // loop through product list
        matches = productList.filter(product => product.category === 'other' ); // end the loop
        break;
      default:
        console.log('nothing in the switch worked');
    }; // end switch

    setDisplayArray(matches)
  }; // end handleSearch

  return (
    <div className="container">
      <Typography variant="h2" gutterBottom>All Products</Typography>

      {/*  This is the search drop down select  */}
       <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon}/>
          <FormControl
          className={classes.formControl}>
            <Select
              value={searchCategory}
              onChange={(e) => 
                setSearchCategory(e.target.value)}
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
              <MenuItem value={'soaps'}>Laundry/Soap containers</MenuItem>
              <MenuItem value={'wraps'}>Food Wraps/SandwichBags</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>
          <Button className={classes.searchButton} variant='contained'
          onClick={handleSearch}>Search</Button>

        </div>

      <Grid container className={classes.grid}>
          {displayArray.length === 0 ? <CircularProgress /> : 
            displayArray.map(product => {
              return (
                  <SingleProduct key={product.id} product={product} />
              )
            })
          }
        </Grid>
        
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MainPage;

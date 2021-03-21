import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// components
import SingleProduct from '../SingleProduct/SingleProduct';

// material ui components
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar,Grid, Toolbar,
  Typography, Button, TextField,
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
}));

function MainPage() {
   // material ui
   const classes = useStyles();
  
  const dispatch = useDispatch();

  // local state
  const [searchCategory, setSearchCategory] = useState('');
  // states from redux
  const user = useSelector(store => store.user);
  const productList = useSelector(store => store.products.productList);
  
  // on page load do this
  useEffect(() => {
    dispatch({type: 'GET_PRODUCT'});
  }, []);

  const handleSearch = function (event) {
    console.log(searchCategory);
  }; // end handleSearch

  // change the product list we loop through depending on search category 
  // use case for williams favorite switch case
  switch (searchCategory) {
    
  }

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
              onChange={(e) => {
                setSearchCategory(e.target.value);
                handleSearch();
              }}
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
            {/* <Button type='submit' variant='contained' color='primary'>Search</Button> */}
          </FormControl>
        </div>

      <Grid container className={classes.grid}>
          {productList.length === 0 ? <div> Products are loading</div> : 
            productList.map(product => {
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

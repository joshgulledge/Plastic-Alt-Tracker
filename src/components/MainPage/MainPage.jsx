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
  const [displayArray, setDisplayArray] = useState('');
  // states from redux
  const user = useSelector(store => store.user);
  const productList = useSelector(store => store.products.productList);
  
  // on page load do this
  useEffect(() => {
    dispatch({type: 'GET_PRODUCT'});
  }, []);

  const handleSearch = function (event) {
    // start with an empty array
    setDisplayArray([]);

    console.log(searchCategory);
    // change the product list we loop through depending on search category 
    // use case for williams favorite switch case
    switch (searchCategory) {
      case '':
        setDisplayArray(productList)
        break;
      case 'all':
        setDisplayArray(productList)
        break;
      case 'utensils':
        console.log('looking for utensils');
        // loop through product list
        productList.map(product => {
          console.log('in the map the product is', product);
          // only return the products with utensils as genre
          if(product.category === 'utensils') {
            console.log('should be a match here');
            // set that product into the displayList
            setDisplayArray([...displayArray, product])
          }; // end if match
        }); // end the map
        console.log('display array is', displayArray);
        break;
      default:
        console.log('nothing in the switch worked');
    }; // end switch

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
              <MenuItem value={'wraps'}>Food Wraps/SandwichBags</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>
          <Button className={classes.searchButton} variant='contained'
          onClick={handleSearch}>Search</Button>

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

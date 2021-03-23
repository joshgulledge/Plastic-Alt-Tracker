import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(5),
    width: '75%',
    // height: theme.spacing(62),
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  grid: {
    flexGrow: 1,
    width: '90%',
    margin: '1px',
  },
}));


const UserHates = function () {
  // material ui
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  // get the preferences from redux
  const likedList = useSelector(store => store.products.userPreference); // contains id of likes
  const allProducts = useSelector(store => store.products.productList); // contains all products
  // this will be the list of liked products
  const [hatedProductList, setHatedProductList] = useState([]);

  const makeProductList = function () {
    const results = [];
    // loop through preference list
    likedList.map( preference => {
      // if its not a hate return 
      if (preference.user_preferences === 1) return;
      // loop through the product list
      allProducts.forEach( product => {
        // where the ids match add that product info to a new obj
        if ( product.id === preference.product_id) {
          const newObj = {
            name: product.brand,
            image: product.image_url,
            id: product.id,
            reason: preference.reason
          };
          // add that new obj to a new array of obj
          results.push(newObj)
        }; // end if match
      }); // end all products loop
    }); // end the liked list loop
    setHatedProductList(results)
  }; // end makeProductList

  useEffect(() => {
    // when the page loads, compare the two list and make an array with only the hated products
    makeProductList();
  }, []);

  const imageClick = function (productID) {
    // find the product with the id
    let item;
    allProducts.forEach(product => {
      if (product.id === productID) {
        item = product;
      };
    });
    // set and go to description page
    dispatch({
      type: 'SET_SINGLE_PRODUCT',
      payload: item
    }); // end dispatch
    history.push('/description')
  }; // end imageClick

  return(
    <div>
      <h3>
        Products you hated
      </h3>

      <Grid container >
        {hatedProductList.map(product => {
        return (
            <Grid key={product.id}
            item xs={4}>
              <Paper 
                className={classes.paper} 
                elevation={3}>
                <Grid container className={classes.grid}>
                  <Grid item xs={12}>
                    <Typography 
                      variant='h4'>
                        {product.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <img src={product.image} width='80%' onClick={() => imageClick(product.id)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                      The Reason You Hated This Product
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='caption'>
                      {product.reason}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
        )
        })}
      </Grid>

    </div>
  )
}; // end UserHates

export default UserHates;
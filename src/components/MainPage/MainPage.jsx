import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// components
import SingleProduct from '../SingleProduct/SingleProduct';

// material ui components
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    width: '90%',
    margin: '1px',
  },
}));

function MainPage() {
   // material ui
   const classes = useStyles();
  
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const productList = useSelector(store => store.products.productList);
  

  useEffect(() => {
    dispatch({type: 'GET_PRODUCT'});
  }, [])

  return (
    <div className="container">
      <Typography variant="h2" gutterBottom>All Products</Typography>

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

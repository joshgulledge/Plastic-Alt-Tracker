import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material ui components
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Typography, CircularProgress } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

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

const SingleProduct = function ({product}) {
  // material ui
  const classes = useStyles();

  // bring in the preferences of the user
  const preferenceList = useSelector(store =>
    store.products.userPreference);
  // this allows us to manipulate the shown page
  const history = useHistory();
  // so we can use dispatch
  const dispatch = useDispatch();

  // handle the image click event
  const imageClick = function () {
    dispatch({
      type: 'SET_SINGLE_PRODUCT',
      payload: product
    }); // end dispatch
    history.push('/description')
  }; // end imageClick

  return (
    <Grid container 
      justify='center' 
      alignItems='center' 
      item xs={12} md={4}>

      <Paper className={classes.paper} elevation={3}>
        <Grid container 
          justify='center'
          alignItems='space-between'
          className={classes.grid} 
          spacing={2}>
          <Grid item>
          <Typography variant="h5" gutterBottom>{product.brand}</Typography>
          </Grid>
          {/* if a like or hate show indication */}
          { preferenceList.length === 0 ? <CircularProgress /> :
            preferenceList.map((preference, index) => {
             // compare the product id in the lists
             if (product.id === preference.product_id) {
               // if its a like show a like icon
                if (preference.user_preferences === 1) {
                 return( 
                   <div key={index}>
                    <ThumbUpAltOutlinedIcon color="primary"/>
                   </div>
                 )
               }; // end if liked

               if (preference.user_preferences === 2) {
                return( 
                    <div key={index}>
                     <ThumbDownAltOutlinedIcon color="secondary"/>
                    </div>
                 )
                }; // end if hated
              }; // end if product is in preference list
            }) // end of map
          }
        </Grid>

        <Grid item>
          <img width='90%' src={product.image_url} alt={product.brand} onClick={imageClick}/>
        </Grid>
        
        <Typography variant="body1" gutterBottom>{product.description}</Typography>
      </Paper>
    </Grid>
  )
}; // end SingleProduct

export default SingleProduct;
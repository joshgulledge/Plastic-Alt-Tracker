import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// import sweet alerts
import swal from 'sweetalert';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Grid, IconButton,
  TextField, Typography, Paper,
   CircularProgress } from '@material-ui/core';
   import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
   import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  grid: {
    margin: theme.spacing(2)
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    width: '80%',
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}));



const DescriptionPage = function () {
  // material ui
  const classes = useStyles();
  // local state
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [preference, setPreference] = useState(0);
  const [imageCount, setImageCount] = useState(0);

  // set up dispatch to use
  const dispatch = useDispatch();

  // get redux stored information
  const product = useSelector(store => store.products.singleProduct);
  const extraInfo = useSelector(store => store.products.singleProductExtra);
  const user = useSelector(store => store.user);
  
  // open and close material ui modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = function () { 
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch({
          type: 'PRODUCT DELETED',
          payload: product.id
        });
        swal("Product has been deleted", {
          icon: "success",
        });
      } else {
        swal("Product has NOT been deleted");
      }
    });
  }; // end deleteProduct

  const likeProduct = function () {
    console.log('like button');
    setPreference(1);
    handleOpen();
  }; // ene likeProduct

  const sendDispatch = function () {
    dispatch({
      type: 'PRODUCT_PREFERENCE',
      payload: {
        product,
        preference: preference,  // what this sends is checked in product router 
        description
      },
    });

    swal('Your preference has been saved');
  }; // end sendDispatch

  const hateProduct = function () {
    console.log('hate button');
    setPreference(2);
    handleOpen();
  }; // end hateProduct

  // to change image on paper
  const goBack = function () {
    // make sure the image count is less than the 
    // number of images returned
    if (imageCount > 0) {
      let counter = imageCount;
      counter--;
      setImageCount(counter);
    };
    if (imageCount <= 0) {
      setImageCount(extraInfo.images.length -1);
    };
  }; // end goBack

  const goForward = function () {
    // make sure the image count is less than the 
    // number of images returned
    if (imageCount < extraInfo.images.length - 1) {
      let counter = imageCount;
      counter++;
      setImageCount(counter);
    };
    if (imageCount >= extraInfo.images.length -1) {
      setImageCount(0);
    };
  }; // end goForward

  return (
      <Grid container className={classes.grid}>
        {/* brand name */}

        <Grid container justify='center' alignItems='center'>
          <Grid item xs={12}>
            <Typography variant='h3' align='center'>
              {product.brand}
            </Typography>
          </Grid>

          {/* short description */}
          <Grid item xs={12}>
            <Typography variant='body1' align='center'>
              {product.description}
            </Typography>
          </Grid>
        </Grid>
      

        {/* delete button */}
        <Grid item xs={12}>
          {user.authority === 'ADMIN' && <Button variant="contained" color="secondary" onClick={deleteProduct}>Delete this product</Button> }
        </Grid>

        {/* image on paper with buttons */}
        <Grid container 
          justify='space-between'
          alignItems='center'>

          <Grid item xs={3}>
            <IconButton aria-label="delete">
              <ArrowBackIosIcon onClick={goBack}/>
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
              {Object.keys(extraInfo).length === 0 ? 
                <div>
                  <CircularProgress />
                </div> :
                <Grid container>
                  {/* displayed image */}
                  <Grid item xs={12}>
                    <img src={extraInfo.images[imageCount].link} width='80%'/>
                  </Grid>
                  {/* buttons */}
                  {/* <Grid containter
                    justify='space-between'> */}
                    <Grid item xs={4}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={likeProduct}>
                          Like this Product
                      </Button>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={hateProduct}>
                          Hate this Product
                      </Button>
                    </Grid>
                  {/* </Grid> */}

                </Grid>
              }
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <IconButton aria-label="delete">
              <ArrowForwardIosIcon onClick={goForward}/>
            </IconButton>
          </Grid>
        </Grid>

        {/* bullets and price */}
        <Grid container justify='space-between'>
          <Grid item xs={4}>
            {Object.keys(extraInfo).length === 0 ? 
              <div>
                <CircularProgress />
              </div> :
              <div>
                {/* bullet points */}
                {extraInfo.feature_bullets.map(point => {
                  return (
                    <Typography variant='body1'>
                      {point}
                  </Typography>
                  )
                })}
              </div>
            }
          </Grid>

          <Grid item xs={4}>
            {Object.keys(extraInfo).length === 0 ?
            <div>
              <CircularProgress />
            </div> :
            <div>
              <Typography variant='body1'>
                Current Price is {extraInfo.buybox_winner.price.raw}
              </Typography>
            </div>}
          </Grid>
        </Grid>

        {/* modal window */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
            <div className={classes.modal}>
              <h4 id="simple-modal-title">
                Please indicate why you feel this way
              </h4>
              <TextField 
                variant = 'outlined'
                value={description}
                multiline
                onChange={(e) => setDescription(e.target.value)} />
              <Button onClick={() => {
                handleClose();
                sendDispatch();
              }}
              variant='contained'
                color='primary'>
                  Submit Description
              </Button>
            </div>
        </Modal>
      
      </Grid>

      // modal window






    // <div>
    //   <h2>{product.brand}</h2>
    //   <p>{product.description}</p>
    //   <img src={product.image_url} alt={product.description} width='12%' />
    //   <p><a href={product.website_link}>See Product on Amazon</a></p>
    //   <div>
    //     <Button variant="contained" color="primary" onClick={likeProduct}>Like this Product</Button>
    //     <Button variant="contained" color="primary" onClick={hateProduct}>Hate this Product</Button>
    //     {user.authority === 'ADMIN' && <Button variant="contained" color="secondary" onClick={deleteProduct}>Delete this product</Button> }
    //   </div>
      // <Modal
      //   open={open}
      //   onClose={handleClose}
      //   aria-labelledby="simple-modal-title"
      //   aria-describedby="simple-modal-description">
      //     <div className={classes.modal}>
      //       <h4 id="simple-modal-title">
      //         Please indicate why you feel this way
      //       </h4>
      //       <TextField 
      //         variant = 'outlined'
      //         value={description}
      //         multiline
      //         onChange={(e) => setDescription(e.target.value)} />
      //       <Button onClick={() => {
      //         handleClose();
      //         sendDispatch();
      //       }}
      //       variant='contained'
      //         color='primary'>
      //           Submit Description
      //       </Button>
      //     </div>
      // </Modal>
      
    // </div>
  )
}; // end DescriptionPage

export default DescriptionPage;
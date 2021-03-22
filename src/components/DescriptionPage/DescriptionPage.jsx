import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// import sweet alerts
import swal from 'sweetalert';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



const DescriptionPage = function () {
  // material ui
  const classes = useStyles();
  // local state
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  // set up dispatch to use
  const dispatch = useDispatch();

  // get redux stored information
  const product = useSelector(store => store.products.singleProduct);
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
    console.log('product liked');
    handleOpen();
    // dispatch({
    //   type: 'PRODUCT_PREFERENCE',
    //   payload: {
    //     product,
    //     preference: 1 // this difference is checked in the product router js file
    //   }
    // });
  }; // ene likeProduct

  const hateProduct = function () {
    console.log('product hated');
    handleOpen();
    // dispatch({
    //   type: 'PRODUCT_PREFERENCE',
    //   payload: {
    //     product,
    //     preference: 2 // this difference is checked in the product router js file
    //   }
    // });

  }; // end hateProduct

  return (
    <div>
      <h2>{product.brand}</h2>
      <p>{product.description}</p>
      <img src={product.image_url} alt={product.description} width='12%' />
      <p><a href={product.website_link}>See Product on Amazon</a></p>
      <div>
        <Button variant="contained" color="primary" onClick={likeProduct}>Like this Product</Button>
        <Button variant="contained" color="primary" onClick={hateProduct}>Hate this Product</Button>
        {user.authority === 'ADMIN' && <Button variant="contained" color="secondary" onClick={deleteProduct}>Delete this product</Button> }
      </div>
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
            <Button onClick={handleClose}
            variant='contained'
              color='primary'>
                Submit Description
            </Button>
          </div>
      </Modal>
      
    </div>
  )
}; // end DescriptionPage

export default DescriptionPage;
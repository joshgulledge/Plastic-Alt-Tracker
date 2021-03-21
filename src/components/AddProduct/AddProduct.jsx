import { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';


// material ui components
import { makeStyles } from '@material-ui/core/styles';
import { TextField, 
  Button, MenuItem,
  FormHelperText, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputs: {
   margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  },
  // selectEmpty: {
  //   // marginTop: theme.spacing(2),
  // },
}));


const AddProduct = function () {
  // material ui
  const classes = useStyles();

  // set dispatch for use
  const dispatch = useDispatch();

  // make local states for form
  const [productBrand, setProductBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [asin, setAsin] = useState('');

  const clearValues = function () {
    setProductBrand('');
    setProductCategory('');
    setImageUrl('');
    setWebsiteUrl('');
    setDescription('');
    setAsin('');
  }; // end clearValues

  const buttonClicked = function (e) {
    e.preventDefault();

    // dispatch({
    //   type: 'ADD_PRODUCT',
    //   payload: {
    //     brand: productBrand,
    //     category: productCategory,
    //     image_url: imageUrl,
    //     website_link: websiteUrl,
    //     description: description,
    //     asin_number: asin
    //   }
    // })

    console.log(productBrand,
      productCategory,
      imageUrl,
      websiteUrl,
      description,
      asin
      );

      clearValues();
  }; // end buttonClicked

  return (
    <div>
      <h4>Add a product here</h4>
      <form>
        <div>
          <TextField
            className={classes.inputs}
            label='Item Brand'
            variant='filled'
            value={productBrand} 
            type="text" 
            onChange={(e)=>setProductBrand(e.target.value)} />

          {/* <TextField
            className={classes.inputs}
            label='Product Category' 
            variant='filled'
            value={productCategory} 
            type="text" 
            onChange={(e)=>setProductCategory(e.target.value)} /> */}

          <FormControl variant="filled" className={classes.formControl}>
            <Select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              displayEmpty
              // className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}>

              <MenuItem value="" disabled>
                Pick a Genre
              </MenuItem>
              <MenuItem value={'utensils'}>Kitchen Utensils</MenuItem>
              <MenuItem value={'garbage bags'}>Garbage Bags</MenuItem>
              <MenuItem value={'bottles'}>Water Bottles</MenuItem>
              <MenuItem value={'personal'}>Personal Items</MenuItem>
              <MenuItem value={'wraps'}>Food Wraps/SandwichBags</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
            <FormHelperText>Plastic Item This Product Replaces</FormHelperText>
          </FormControl>
        </div>

        <div>
          <TextField
            className={classes.inputs}
            label='Image URL'
            variant='filled' 
            value={imageUrl} 
            type="text" 
            onChange={(e)=>setImageUrl(e.target.value)} />

          <TextField
            className={classes.inputs}
            label='Website Url'
            variant='filled' 
            value={websiteUrl} 
            type="text" 
            onChange={(e)=>setWebsiteUrl(e.target.value)} />
        </div>

        <div>
          <TextField
            className={classes.inputs}
            label='Product Description'
            variant='filled' 
            value={description} 
            type="text" 
            onChange={(e)=>setDescription(e.target.value)} />

          <TextField
            className={classes.inputs}
            label='ASIN number'
            variant='filled' 
            value={asin} 
            type="text" 
            onChange={(e)=>setAsin(e.target.value)} />
        </div>


        <Button 
         className={classes.inputs}
         variant='contained'
         color='primary'
         onClick={buttonClicked}>
           Add Product To DataBase
        </Button>
      </form>
    </div>
  )
}; // end AddProduct

export default AddProduct;
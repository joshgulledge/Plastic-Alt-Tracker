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

    // check to make sure all categories are filled in

    // send the new product to sage then to db
    dispatch({
      type: 'ADD_PRODUCT',
      payload: {
        brand: productBrand,
        category: productCategory,
        image_url: imageUrl,
        website_link: websiteUrl,
        description: description,
        asin_number: asin
      }
    })
      clearValues();
  }; // end buttonClicked

  // This is to quickly add information for my presentation
const presentAdd = function () {
  setProductBrand('LIFEWTR');
  setProductCategory('bottles');
  setImageUrl('https://images-na.ssl-images-amazon.com/images/I/91h1PTUd6nL._SL1500_.jpg');
  setWebsiteUrl('https://www.amazon.com/Purified-Balanced-Electrolytes-mLbottles-Packaging/dp/B07D8LQVZQ/ref=sr_1_1_sspa?dchild=1&keywords=plastic+free+bottled+water&qid=1616867003&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzN0VLSjJRNzdDVVpZJmVuY3J5cHRlZElkPUEwNzY5NDI4QTlMNUZVQVdOSE1LJmVuY3J5cHRlZEFkSWQ9QTA2NDc3NDAxSlBMSlFLMkFaTk1JJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==');
  setDescription('LIFEWTR Premium Purified Water, 16.9 Fl Oz (Pack of 12)');
  setAsin('B07D8LQVZQ');
}; // end presentAdd

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
            // onChange={(e)=>setProductBrand(e.target.value)} />
            onChange={presentAdd} />

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
              <MenuItem value={'soaps'}>Laundry/Soap containers</MenuItem>
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
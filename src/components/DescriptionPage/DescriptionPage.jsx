import { useSelector, useDispatch } from 'react-redux';

// material ui
import Button from '@material-ui/core/Button';


const DescriptionPage = function () {
  // set up dispatch to use
  const dispatch = useDispatch();
  // get redux stored information
  const product = useSelector(store => store.products.singleProduct);
  const user = useSelector(store => store.user);
  
  const deleteProduct = function () { 
    dispatch({
      type: 'PRODUCT DELETED',
      payload: product.id
    });
  }; // end deleteProduct

  const likeProduct = function () {
    dispatch({
      type: 'PRODUCT_PREFERENCE',
      payload: {
        product,
        preference: 1 // this difference is checked in the product router js file
      }
    })
  }; // ene likeProduct

  const hateProduct = function () {
    console.log('product hated');
    dispatch({
      type: 'PRODUCT_PREFERENCE',
      payload: {
        product,
        preference: 2 // this difference is checked in the product router js file
      }
    })
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
      
    </div>
  )
}; // end DescriptionPage

export default DescriptionPage;
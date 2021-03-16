import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const SingleProduct = function ({product}) {
  // this allows us to manipulate the shown page
  const history = useHistory();
  // so we can use dispatch
  const dispatch = useDispatch();

  const imageClick = function () {
    console.log('image was clicked');
    
    dispatch({
      type: 'SET_SINGLE_PRODUCT',
      payload: product
    }); // end dispatch

    history.push('/description')
  }; // end imageClick

  return (
    <div>
      <h5>{product.brand}</h5>
      <img width='25%' src={product.image_url} alt={product.brand} onClick={imageClick}/>
      <p>{product.description}</p>
    </div>
  )
}; // end SingleProduct

export default SingleProduct;
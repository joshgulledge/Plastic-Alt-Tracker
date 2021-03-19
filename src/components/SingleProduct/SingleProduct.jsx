import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const SingleProduct = function ({product}) {
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
    <div>
      <h5>{product.brand}</h5>

      {/* if a like or hate show indication */}
      { preferenceList.length === 0 ? <h2>Products are loading </h2> :
        preferenceList.map(preference => {
          // compare the product id in the lists
          if (product.id === preference.product_id) {
            // if its a like show a like thing
            if (preference.user_preferences === 1) {
              return( 
                <h6>Product was liked!</h6>
              )
            }; // end if liked

            if (preference.user_preferences === 2) {

              return( 
                <h6>Product was Hated!</h6>
              )
            }; // end if hated
          }; // end if product is in preference list
        }) // end of map
      }

      <img width='25%' src={product.image_url} alt={product.brand} onClick={imageClick}/>
      <p>{product.description}</p>
    </div>
  )
}; // end SingleProduct

export default SingleProduct;
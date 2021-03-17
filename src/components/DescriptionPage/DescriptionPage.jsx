import { useSelector, useDispatch } from 'react-redux';


const DescriptionPage = function () {
  // set up dispatch to use
  const dispatch = useDispatch();
  // get redux stored information
  const product = useSelector(store => store.products.singleProduct);
  const user = useSelector(store => store.user);

  const likeProduct = function () {
    dispatch({
      type: 'PRODUCT_LIKED',
      payload: {
        product,
        user
      }
    })
  }; // ene likeProduct

  const deleteProduct = function () { 
    dispatch({
      type: 'PRODUCT DELETED',
      payload: {
        product
      }
    })
  }; // end deleteProduct

  const hateProduct = function () {
    console.log('product hated');
    dispatch({
      type: 'PRODUCT_HATED',
      payload: {
        product,
        user
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
        <button onClick={likeProduct}>Like this Product</button>
        <button onClick={hateProduct}>Hate this Product</button>
      </div>
      {user.authority === 'ADMIN' && <button onClick={deleteProduct}>Delete this product</button> }
      
    </div>
  )
}; // end DescriptionPage

export default DescriptionPage;
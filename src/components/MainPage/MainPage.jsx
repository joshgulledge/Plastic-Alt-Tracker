import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// components
import SingleProduct from '../SingleProduct/SingleProduct';


function MainPage() {
  
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const productList = useSelector(store => store.products.productList)

  useEffect(() => {
    dispatch({type: 'GET_PRODUCT'});
  }, [])

  return (
    <div className="container">
      <h2>This page will show a list of products</h2>
        {productList.length === 0 ? <div> Products are loading</div> : 
          productList.map(product => {
            return (
              <div key={product.id}>
                <SingleProduct product={product} />
              </div>
            )
          })
        }
        
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MainPage;

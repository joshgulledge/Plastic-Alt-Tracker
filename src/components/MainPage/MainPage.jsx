import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';


function MainPage() {
  // this allows us to manipulate the shown page
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const productList = useSelector(store => store.productReducer)

  useEffect(() => {
    dispatch({type: 'GET_PRODUCT'});
  }, [])
  

  const imageClick = function () {
    console.log('image was clicked');
    history.push('/description')
  }; // end imageClick

  console.log('🎉', productList)

  return (
    <div className="container">
      <h2>This page will show a list of products</h2>
        {productList.length === 0 ? <div> Products are loading</div> : 
          productList.map(product => {
            return (
              <div key={product.id}>
                <h5>{product.brand}</h5>
                <img src={product.image_url} alt={product.brand}/>
              </div>
            )
          })
        }
        {/* <img src='https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80' width='25%' alt='random image' onClick={imageClick}/> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MainPage;

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const UserHates = function () {
  const dispatch = useDispatch();
  const history = useHistory();

  // get the preferences from redux
  const likedList = useSelector(store => store.products.userPreference); // contains id of likes
  const allProducts = useSelector(store => store.products.productList); // contains all products
  // this will be the list of liked products
  const [hatedProductList, setHatedProductList] = useState([]);

  const makeProductList = function () {
    const results = [];
    // loop through preference list
    likedList.map( preference => {
      // if its not a hate return 
      if (preference.user_preferences === 1) return;
      // loop through the product list
      allProducts.forEach( product => {
        // where the ids match add that product info to a new obj
        if ( product.id === preference.product_id) {
          const newObj = {
            name: product.brand,
            image: product.image_url,
            id: product.id,
            reason: preference.reason
          };
          // add that new obj to a new array of obj
          results.push(newObj)
        }; // end if match
      }); // end all products loop
    }); // end the liked list loop
    setHatedProductList(results)
  }; // end makeProductList

  useEffect(() => {
    // when the page loads, compare the two list and make an array with only the hated products
    makeProductList();
  }, []);
  const imageClick = function (product) {
    dispatch({
      type: 'SET_SINGLE_PRODUCT',
      payload: product
    }); // end dispatch
    history.push('/description')
  }; // end imageClick

  return(
    <div>
      <h3>
        This page will display the hated products 😎
      </h3>

      {hatedProductList.map(product => {
        return (
          <div key={product.id}>
            <img src={product.image} width='20%' onClick={() => imageClick(product)}/>
            <span>
              {product.reason}
            </span>

          </div>
        )
      })}

    </div>
  )
}; // end UserHates

export default UserHates;
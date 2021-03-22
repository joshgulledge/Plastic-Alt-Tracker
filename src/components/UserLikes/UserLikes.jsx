import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const UserLikes = function () {
  const dispatch = useDispatch();
  const history = useHistory();

  // get the preferences from redux
  const likedList = useSelector(store => store.products.userPreference); // contains id of likes
  const allProducts = useSelector(store => store.products.productList); // contains all products

  // this will be the list of liked products
  const [likedProductList, setLikedProductList] = useState([]);

  const makeProductList = function () {
    // loop through the lists and if the product is in the liked list, add to liked product array
    const results = [];
    likedList.map(like => {
      // check if its a like, 2 represents hated products
     if (like.user_preferences === 2) return;
      // the filter returns the object that matches into an array,
     const [result] = allProducts.filter(product => product.id === like.product_id);
      // i got the object out of the array and pushed it into another one
     results.push(result);
    }); // end like forEach
    setLikedProductList(results);
  }; // end makeProductList

  useEffect(() => {
    // when the page loads, compare the two list and make an array with only the liked products
    makeProductList();
  }, []);

  const imageClick = function (product) {
    dispatch({
      type: 'SET_SINGLE_PRODUCT',
      payload: product
    }); // end dispatch
    history.push('/description')
  }; // end imageClick

  return (
    <div>
      <h3>
        This page will display the liked products 😎
      </h3>

      {likedProductList.map(product => {
        return (
          <div key={product.id}>
            <img src={product.image_url} width='20%' onClick={() => imageClick(product)} />
          </div>
        )
      })}

    </div>
  )
}; // end UserLikes

export default UserLikes;
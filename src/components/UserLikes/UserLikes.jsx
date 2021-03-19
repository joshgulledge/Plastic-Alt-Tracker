import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const UserLikes = function () {
  // get the preferences from redux
  const likedList = useSelector(store => store.products.userPreference); // contains id of likes
  const allProducts = useSelector(store => store.products.productList); // contains all products
  // this will be the list of liked products
  const [likedProductList, setLikedProductList] = useState([]);

  const makeProductList = function () {
    // loop through the lists and if the product is in the liked list, add to liked product array
    const results = [];
    likedList.map(like => {
      // check if its a like
     if (like.user_preferences === 2) return;

     const [result] = allProducts.filter(product => product.id === like.product_id);
     results.push(result);
    }); // end like forEach

    setLikedProductList(results);
  }; // end makeProductList

  useEffect(() => {
    // when the page loads, compare the two list and make an array with only the liked products
    makeProductList();
  }, []);

  return (
    <div>
      <h3>
        This page will display the liked products 😎
      </h3>

      {likedProductList.map(product => {
        return (
          <div key={product.id}>
            <img src={product.image_url} width='20%' />
          </div>
        )
      })}

    </div>
  )
}; // end UserLikes

export default UserLikes;
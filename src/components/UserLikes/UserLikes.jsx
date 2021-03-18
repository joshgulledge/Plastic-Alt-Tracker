import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const UserLikes = function () {
  // get the likes from redux
  const likedList = useSelector(store => store.products.userPreference); // contains id of likes
  const allProducts = useSelector(store => store.products.productList); // contains all products

  // this will be the list of liked products
  const LikedProductList = [];

  const makeProductList = function () {
    likedList.map()
  }

  useEffect(() => {
    // when the page loads, compare the two list and make an array with only the liked products
    makeProductList();
  }, []);

  
  console.log(LikedProducts);

  return (
    <div>
      <h3>
        This page will display the liked products 😎
      </h3>

    </div>
  )
}; // end UserLikes

export default UserLikes;
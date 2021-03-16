// this will be the reducers that deal with the products
import { combineReducers } from 'redux';

const productList = function (state = [], action) {
  switch (action.type) {
    case 'SET_PRODUCT_LIST':
      return action.payload;
    default:
      return state;
  }; 
}; // end productList

const singleProduct = function (state = {}, action) {
  switch (action.type) {
    case 'SET_SINGLE_PRODUCT':
      return action.payload;
    default:
      return state;
  }
}; // end singleProduct

export default combineReducers({
  productList,
  singleProduct,
});
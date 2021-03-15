// this will be the reducers that deal with the products

const productReducer = function (state = [], action) {
  switch (action.type) {
    case 'SET_PRODUCT_LIST':
      return action.payload;
    default:
      return state;
  }; 
}; // end productReducer

export default productReducer;
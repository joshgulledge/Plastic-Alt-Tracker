import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* productSaga () {
  yield takeEvery('GET_PRODUCT', getProduct)
  yield takeEvery('ADD_PRODUCT', addProduct);
  yield takeEvery('PRODUCT_PREFERENCE', productPreference);
  yield takeEvery('PRODUCT DELETED', productDelete);
  yield takeEvery('SET_SINGLE_PRODUCT', setSingleProduct)
}; // end productSaga

const setSingleProduct = function* (action) {
  try {
    // make sure the extra reducer is clear
    yield put({type: 'CLEAR_PRODUCT_EXTRA'});

    // send info straight to reducer
    yield put({
      type: 'SINGLE_PRODUCT',
      payload: action.payload
    });

    // also send to rainforest api to get product info
    const asin = action.payload.asin_number
    const response = yield axios.post('/api/products/rainforest', {value: asin});

    // send that also to a redux store for use
    yield put({
      type: 'SINGLE_PRODUCT_EXTRA',
      payload: response.data.product
    });

  }
  catch (err) {
    console.log('something went wrong in the set single product 💥', err)
  }
}; // end setSingleProduct

const productDelete = function* (action) {
  try {
    console.log('...in delete...');

   axios.delete(`/api/products/${action.payload}`);

  }
  catch (err) {
    console.log('something went wrong in the delete 💥', err)
  }
}; // end productDelete

const productPreference = function* (action) {
  try {
    yield axios.post('/api/products/pref', {update: action.payload});

    // here we want to update our list of likes which is done when we get the products
    yield put({
      type: 'GET_PRODUCT'
    });
  }
  catch (err) {
    console.log('something went wrong in the like💥', err)
  }; 
}; // end productLiked

const addProduct = function* (action) {
  try {
    // send to the server
    yield axios.post('/api/products',{newProduct: action.payload});

    // update all product list
    yield put({
      type: 'GET_PRODUCT'
    });
  }
  catch (err) {
    console.log('uh oh, we got a problem 💥 :', err);
  }
}; // end addProduct


const getProduct = function* () {
  // first get all the products
  try {
    const response = yield axios.get('/api/products');
    // send product info to redux store
    yield put({
      type: 'SET_PRODUCT_LIST',
      payload: response.data.products
    });

    // send preference info to redux store
    yield put ({
      type: 'SET_PREFERENCE_LIST',
      payload: response.data.preferences
    });
  }
  catch (err) {
    console.log(err);
  };
  
}; // end getProduct

export default productSaga;
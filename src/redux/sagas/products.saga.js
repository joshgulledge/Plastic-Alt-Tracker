import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* productSaga () {
  yield takeEvery('GET_PRODUCT', getProduct)
  yield takeEvery('ADD_PRODUCT', addProduct);
  yield takeEvery('PRODUCT_LIKED', productLiked);
  yield takeEvery('PRODUCT_HATED', productHated);
  yield takeEvery('PRODUCT DELETED', productDelete);
}; // end productSaga

const productDelete = function* (action) {
  try {
  //  axios.delete()
  }
  catch (err) {
    console.log('something went wrong in the delete 💥', err)
  }
}; // end productDelete

const productHated = function* (action) {
  try {
    console.log('in hated');

    yield axios.post('/api/products/hate', {update: action.payload});
  }
  catch (err) {
    console.log('something went wrong in the hate 💥', err);
  }
}; // end productHated

const productLiked = function* (action) {
  try {
    yield axios.post('/api/products/likes', {update: action.payload});

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
    // send info from db to redux store
    yield put({
      type: 'SET_PRODUCT_LIST',
      payload: response.data
    });
  }
  catch (err) {
    console.log(err);
  };
  // second get liked/hated products
  
}; // end getProduct

export default productSaga;
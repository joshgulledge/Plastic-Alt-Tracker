import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* productSaga () {
  yield takeEvery('GET_PRODUCT', getProduct)
  yield takeEvery('ADD_PRODUCT', addProduct);
  yield takeEvery('PRODUCT_LIKED', productLiked)
}; // end productSaga

const productLiked = function* (action) {
  try {
    yield axios.post('/api/products/likes', {update: action.payload});

    console.log('it worked');
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
}; // end getProduct

export default productSaga;